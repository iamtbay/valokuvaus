import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../axios/axios";

export const getPhotoLikes = createAsyncThunk(
  "photo/likes",
  async (state: string, thunkAPI) => {
    try {
      const getLikes = await baseUrl.get(`/api/v1/likes/like/${state}`);
      const res = getLikes.data;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const likePhoto = createAsyncThunk(
  "photo/likePhoto",
  async (state: string, thunkAPI) => {
    try {
      const likePhoto = await baseUrl.post(
        `/api/v1/likes/like/${state}`,
        state
      );
      const res = await likePhoto.data;
      thunkAPI.dispatch(getPhotoLikes(state));
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
//delete like
export const noLikePhoto = createAsyncThunk(
  "photo/noLike",
  async (state: string, thunkAPI) => {
    try {
      const unlikephoto = await baseUrl.delete(`api/v1/likes/like/${state}`);
      const res = await unlikephoto.data;
      thunkAPI.dispatch(getPhotoLikes(state));
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
interface ILikesInitialState {
  allLikes: IAllLikes[];
}
interface IAllLikes {
  _id: string;
  userId: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
}
const initialState: ILikesInitialState = {
  allLikes: [],
};
const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get photo's likes start
    builder.addCase(getPhotoLikes.pending, () => {}),
      builder.addCase(getPhotoLikes.fulfilled, (state, { payload }) => {
        state.allLikes = payload;
      }),
      builder.addCase(getPhotoLikes.rejected, (state, { payload }) => {
        console.log(payload);
      }),
      //end photo's likes

      //like photo start
      builder.addCase(likePhoto.pending, () => {}),
      builder.addCase(likePhoto.fulfilled, () => {}),
      builder.addCase(likePhoto.rejected, (_, { payload }) => {
        console.log(payload);
      });

    //remove like starts here.
    builder.addCase(noLikePhoto.pending, () => {}),
      builder.addCase(noLikePhoto.fulfilled, () => {}),
      builder.addCase(noLikePhoto.rejected, (_, { payload }) => {
        console.log(payload);
      });
    //remove like ends here.
  },
});

export const {} = likeSlice.actions;
export default likeSlice.reducer;
