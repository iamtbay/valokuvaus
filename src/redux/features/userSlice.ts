import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUserInfos } from "../../components/Auth/Form";
import { baseUrl } from "../../axios/axios";
import { toast } from "react-toastify";

///TYPES & INTERFACES
export interface UserState {
  userInfo: IUserInfo;
  userSettings: IUserSettings;
}
interface TUserState {
  user: {
    userInfo: IUserInfo;
    userSettings: IUserSettings;
  };
}
interface IUserInfo {
  authLogin: boolean;
  username: string;
  password: string;
  email: string;
}

interface IUserSettings {
  loggedIn: boolean;
  username: string;
  userId: string;
  email: string;
}
//TYPES & INTERFACES END

//STATES --- ---------
//INITIAL STATE START
const initialState: UserState = {
  userInfo: { authLogin: true, username: "", password: "", email: "" },
  userSettings: { loggedIn: false, username: "", userId: "", email: "" },
};
//INITIAL STATE END

//AUTH OPERATION ASYNC THUNK
export const authOperation = createAsyncThunk(
  "user/auth",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as TUserState;

    const method = user.userInfo.authLogin ? "" : "register";
    try {
      const response = await baseUrl.post(`/user/${method}`, user.userInfo);
      const data = await response.data;
      if (method !== "register") {
        thunkAPI.dispatch(checkUser());
      }
      return { data, method };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
//AUTH OPERATION ASYNC THUNK END!

//LOGOUT OPERATION ASYNCTHUNK START!
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await baseUrl.get("/user/logout");
      const data = response.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong...");
    }
  }
);
//LOGOUT OPERATION ASYNCTHUNK END!

//CHECKUSER ASYNC THUNK
export const checkUser = createAsyncThunk("user/check", async (_, thunkAPI) => {
  try {
    const response = await baseUrl.get("/user/verify");
    const data = await response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("User has not verified.");
  }
});

interface IUserInfoChanger {
  username: string;
  password: string;
  email: string;
}
export const userSlice = createSlice({
  name: "user",
  initialState,
  //REDUCERS
  reducers: {
    changeMethod: (state) => {
      state.userInfo.authLogin = !state.userInfo.authLogin;
    },
    changeMethodRegister: (state) => {
      state.userInfo.authLogin = false;
    },
    changeMethodLogin: (state) => {
      state.userInfo.authLogin = true;
    },
    userInfoHandleChange: (state, { payload: { name, value } }) => {
      const info = state.userInfo;
      info[name as keyof IUserInfoChanger] = value;
    },
  },
  //EXTRA REDUCERS
  extraReducers: (builder) => {
    //LOGIN/REGISTER
    builder.addCase(authOperation.pending, () => {}),
      builder.addCase(authOperation.fulfilled, (state, { payload }) => {
        state.userInfo = {
          authLogin: true,
          username: "",
          email: "",
          password: "",
        };
        if (payload.method === "register") {
          console.log("succesfully registered");
          //return toast.success("Succesfully registered...");
          return;
        }
        //toast.success(msg);
        console.log(`Succesfully logged in, redirecting...`);
      }),
      builder.addCase(authOperation.rejected, (_, { payload }) => {
        console.log(payload);
        alert(payload);
      }),
      //LOGIN REGISTER END

      //LOGOUT START
      builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.userSettings = {
          loggedIn: false,
          username: "",
          userId: "",
          email: "",
        };
        location.reload();
      }),
      builder.addCase(logoutUser.rejected, (_, { payload }) => {
        console.log(payload);
      }),
      //LOGOUT END
      //CHECK USER START
      builder.addCase(checkUser.fulfilled, (state, { payload: { user } }) => {
        state.userSettings = {
          loggedIn: true,
          email: user.email,
          userId: user.userId,
          username: user.username,
        };
      }),
      builder.addCase(checkUser.rejected, (state) => {
        state.userSettings = {
          loggedIn: false,
          email: "",
          userId: "",
          username: "",
        };
      });
    //CHECK USER END

    // LOGIN VARSA LOGIN EKRANINI DUZELT
  },
});
export const {
  userInfoHandleChange,
  changeMethod,
  changeMethodRegister,
  changeMethodLogin,
} = userSlice.actions;
export default userSlice.reducer;
