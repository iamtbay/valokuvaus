import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../axios/axios";

export interface IInitialState {
  newPhotoInfos: INewPhotoInfos;
  photoPath: string | Blob;
  allPhotos: IPhotoState[];
  isLoading: boolean;
  singlePhoto: ISinglePhotoPage;
}
interface IGetPhotoState {
  photo: IInitialState;
}
export interface IPhotoState {
  category: string;
  createdAt: Date;
  desc: string;
  photoPath: string;
  tags: string[];
  title: string;
  updatedAt: Date;
  userId: string;
  __v: number;
  _id: string;
  userInfo: [{ username: string }];
}
export interface INewPhotoInfos {
  location: string;
  device: string;
  title: string;
  desc: string;
  category: string;
  tags: string;
}
export interface ISinglePhotoPage {
  isLoading: boolean;
  _id: string;
  userId: string;
  photoPath: string;
  title: string;
  desc: string;
  category: string;
  tags: [string];
  createdAt: string;
  location: string;
  device: string;
  userInfo: [{ username: string }];
}
const initialState: IInitialState = {
  allPhotos: [],
  photoPath: "",
  newPhotoInfos: {
    location: "",
    device: "",
    title: "",
    desc: "",
    category: "",
    tags: "",
  },
  isLoading: false,
  singlePhoto: {
    isLoading: false,
    location: "",
    device: "",
    _id: "",
    userId: "",
    photoPath: "",
    title: "",
    desc: "",
    category: "",
    tags: [""],
    createdAt: "",
    userInfo: [{ username: "" }],
  },
};

//ASYNCTHUNKS START
export const getSinglePhoto = createAsyncThunk(
  "photo/singlePhoto",
  async (state: string, thunkAPI) => {
    try {
      const singlePhoto = await baseUrl.get(`/api/v1/explore/photo/${state}`);
      const res = singlePhoto.data;

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addNewPhoto = createAsyncThunk(
  "photo/addNewPhoto",
  async (state: File, thunkAPI) => {
    // This func getting values photoinfos to send a new request to addphoto.
    const {
      photo: { newPhotoInfos },
    } = thunkAPI.getState() as IGetPhotoState;
    const values = { newPhotoInfos, photoPath: state };
    try {
      const addPhoto = await baseUrl.post("/api/v1/explore", values);
      const res = addPhoto.data;
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPhotos = createAsyncThunk("photo/getPhotos", async () => {
  try {
    const allPhotos = await baseUrl.get("/api/v1/explore");
    const res = allPhotos.data;
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteImage = createAsyncThunk(
  "photo/deleteImage",
  async (id: string, thunkAPI) => {
    try {
      const photo = await baseUrl.delete(`/api/v1/explore/photo/${id}`);
      const res = photo.data;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

//ASYNCTHUNKS END

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      const info = state.newPhotoInfos;
      info[name as keyof INewPhotoInfos] = value;
    },
    handlePhotoPath: (state, { payload }) => {
      state.photoPath = payload;
    },
    clearPhotoPath: (state) => {
      state.photoPath = "";
    },
    clearImgState: (state) => {
      state.photoPath = "";
    },
    clearState: (state) => {
      state.newPhotoInfos = {
        title: "",
        desc: "",
        category: "",
        tags: "",
        location: "",
        device: "",
      };
      state.photoPath = "";
    },
  },
  extraReducers: (builder) => {
    //ADD NEW PHOTO START
    builder.addCase(addNewPhoto.pending, () => {});
    builder.addCase(addNewPhoto.fulfilled, (state, { payload }) => {
      photoSlice.caseReducers.clearState(state);
      alert("success");
    });
    builder.addCase(addNewPhoto.rejected, () => {
      alert("something went wrong");
    });
    //ADD NEW PHOTO END
    //GET ALL PHOTOS START HERE
    builder.addCase(getAllPhotos.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPhotos.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.allPhotos = payload;
    });
    builder.addCase(getAllPhotos.rejected, (state) => {
      state.isLoading = false;
    });
    //GET ALL PHOTOS END HERE

    //GET SINGLE PHOTO START HERE
    builder.addCase(getSinglePhoto.pending, (state) => {
      state.singlePhoto.isLoading = true;
    });
    builder.addCase(getSinglePhoto.fulfilled, (state, { payload }) => {
      state.singlePhoto = payload.data;
      state.singlePhoto.isLoading = false;
    });
    builder.addCase(getSinglePhoto.rejected, (state) => {
      state.singlePhoto.isLoading = false;
      console.log("rejected");
    });
    //GET SINGLE PHOTO END HERE

    //DELETE SINGLE PHOTO START HERE
    builder.addCase(deleteImage.pending, () => {});
    builder.addCase(deleteImage.fulfilled, (state, { payload }) => {});
    builder.addCase(deleteImage.rejected, (state, { payload }) => {
      alert(payload);
    });
    //DELETE SINGLE PHOTO END HERE
  },
});
export const {
  handleChange,
  handlePhotoPath,
  clearPhotoPath,
  clearState,
  clearImgState,
} = photoSlice.actions;
export default photoSlice.reducer;
