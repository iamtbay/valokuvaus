import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../axios/axios";
export interface IUserComments {
  _id: string;
  userId: string;
  imageId: string;
  comment: string;
  rating: number;
  date: Date | null;
}
interface IUserPhotos {
  _id: string;
  photoPath: string;
}
interface IUserLikes {
  imageId: string;
}
interface IUserName {
  username: string;
  isLoading: boolean;
}
interface IInitialState {
  userPhotos: { isLoading: boolean; photos: IUserPhotos[] };
  userComments: IUserComments[];
  userLikes: IUserLikes[];
  username: IUserName;
}
const initialState: IInitialState = {
  username: { isLoading: false, username: "" },
  userPhotos: { isLoading: false, photos: [{ _id: "", photoPath: "" }] },
  userComments: [
    {
      _id: "",
      userId: "",
      imageId: "",
      comment: "",
      rating: 0,
      date: null,
    },
  ],
  userLikes: [{ imageId: "" }],
};
export const getUserName = createAsyncThunk(
  "profile/getUsername",
  async (id: string, thunkAPI) => {
    try {
      const username = await baseUrl.get(`/user/settings/${id}`);
      const res = await username.data;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserPhotos = createAsyncThunk(
  "profile/getPhotos",
  async (id: string, thunkAPI) => {
    try {
      const userphotos = await baseUrl.get(`/api/v1/explore/photo/user/${id}`);
      const res = await userphotos.data;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getUserComments = createAsyncThunk(
  "profile/getComments",
  async (id: string, thunkAPI) => {
    try {
      const usercomments = await baseUrl.get(`/api/v1/comments/user/${id}`);
      const res = await usercomments.data;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getUserLikes = createAsyncThunk(
  "profile/getLikes",
  async (id: string, thunkAPI) => {
    try {
      const userLikes = await baseUrl.get(`/api/v1/likes/like/user/${id}`);
      const res = await userLikes.data.userLikes;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearStates: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    //get user photos start
    builder.addCase(getUserPhotos.pending, (state) => {
      state.userPhotos.isLoading = true;
    });
    builder.addCase(getUserPhotos.fulfilled, (state, { payload }) => {
      state.userPhotos.photos = payload;
      state.userPhotos.isLoading = false;
    });
    builder.addCase(getUserPhotos.rejected, (state, { payload }) => {
      console.log("get user photo rejected");
    });
    //get user photos end
    //get user comments start
    builder.addCase(getUserComments.pending, (state) => {});
    builder.addCase(getUserComments.fulfilled, (state, { payload }) => {
      state.userComments = payload;
    });
    builder.addCase(getUserComments.rejected, (state, { payload }) => {
      console.log(payload);
    });
    //get user comments end
    //get user name start
    builder.addCase(getUserName.pending, (state) => {
      state.username.isLoading = true;
    });
    builder.addCase(getUserName.fulfilled, (state, { payload }) => {
      state.username.username = payload.username;
      state.username.isLoading = false;
    });
    builder.addCase(getUserName.rejected, (state, { payload }) => {
      console.log(payload);
    });
    //get user name end

    builder.addCase(getUserLikes.pending, (state) => {});
    builder.addCase(getUserLikes.fulfilled, (state, { payload }) => {
      state.userLikes = payload;
    });
    builder.addCase(getUserLikes.rejected, (state, { payload }) => {
      console.log(payload);
    });
    //get user likes end
  },
});

export const { clearStates } = userProfileSlice.actions;
export default userProfileSlice.reducer;
