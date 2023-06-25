import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../axios/axios";

interface IInitialStateComment {
  newCommentInfo: INewCommentInfo;
  allComments: IAllComments[];
  isLoading: boolean;
  commentExist: boolean;
}
interface INewCommentInfo {
  showComment: boolean;
  editComment: boolean;
  comment: string;
  rating: number | null;
  commentId?: string;
}
export interface IAllComments {
  comment: string;
  date: string;
  imageId: string;
  rating: number;
  userId: string;
  __v: number;
  _id: string;
  userInfo: [{ username: string }];
}
const initialState: IInitialStateComment = {
  allComments: [
    {
      comment: "",
      date: "",
      imageId: "",
      rating: 0,
      userId: "",
      __v: 0,
      _id: "",
      userInfo: [{ username: " " }],
    },
  ],
  commentExist: false,
  isLoading: false,
  newCommentInfo: {
    showComment: false,
    editComment: false,
    comment: "",
    rating: null,
  },
};
interface IGetCommentState {
  comment: IInitialStateComment;
}
//GET ALL COMMENT START
export const getAllComments = createAsyncThunk(
  "comments/allComments",
  async (id: string, thunkAPI) => {
    try {
      const allComments = await baseUrl.get(`/api/v1/comments/${id}`);
      const res = allComments.data;
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);
//GET ALL COMMENT END

//ADD NEW COMMENT START
export const addNewComment = createAsyncThunk(
  "comments/addNewComment",
  async (id: string | number, thunkAPI) => {
    const {
      comment: { newCommentInfo },
    } = thunkAPI.getState() as IGetCommentState;

    try {
      const newComment = await baseUrl.post(
        `/api/v1/comments/${id}`,
        newCommentInfo
      );
      const res = newComment.data;
      thunkAPI.dispatch(getAllComments(id as string));
      return res;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong kun adding comment");
    }
  }
);
//ADD NEW COMMENT END

//DELETE COMMENT START
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId, imgId }: { commentId: string; imgId: any }, thunkAPI) => {
    try {
      const delComment = await baseUrl.delete(
        `/api/v1/comments/singleComment/${commentId}`
      );
      const data = delComment.data;
      thunkAPI.dispatch(getAllComments(imgId));
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
//DELETE COMMENT END
//EDIT COMMENT START
interface IPatchComment {
  imageId: string;
}
export const patchComment = createAsyncThunk(
  "comments/patchComment",
  async ({ imageId }: IPatchComment, thunkAPI) => {
    const {
      comment: { newCommentInfo },
    } = thunkAPI.getState() as IGetCommentState;

    try {
      const patchedComment = await baseUrl.patch(
        `/api/v1/comments/singleComment/${newCommentInfo.commentId}`,
        newCommentInfo
      );
      thunkAPI.dispatch(getAllComments(imageId));
      const data = patchedComment.data;
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue("something went wrong while patching comment");
    }
  }
);
//EDIT COMMENT END

//async thunks end here
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      //burasi cokomelli
      state.newCommentInfo = {
        ...state.newCommentInfo,
        [name as keyof INewCommentInfo]: value,
      };
    },
    showCommentComponent: (state) => {
      state.newCommentInfo.showComment = !state.newCommentInfo.showComment;
    },
    closeCommentComponent: (state) => {
      state.newCommentInfo.showComment = false;
    },
    handleCommentEdit: (state, { payload: { commentId, comment, rating } }) => {
      state.newCommentInfo.showComment = true;
      state.newCommentInfo.editComment = true;
      state.newCommentInfo.comment = comment;
      state.newCommentInfo.rating = rating;
      state.newCommentInfo.commentId = commentId;
    },
    clearCurrentCommentInfo: (state) => {
      //it's turning showcomponent and editcomponents states to false.
      state.newCommentInfo = initialState.newCommentInfo;
    },
  },
  extraReducers: (builder) => {
    //ADD NEW COMMENT START
    builder.addCase(addNewComment.pending, () => {});
    builder.addCase(addNewComment.fulfilled, (state, { payload }) => {
      //turn comment state to initial state to clear
      state.newCommentInfo = { ...initialState.newCommentInfo };
    });
    builder.addCase(addNewComment.rejected, (_, { payload }) => {
      alert("jotain meni pieleen");
      console.log(payload);
    });
    //ADD NEW COMMENT END
    //GET ALL COMMENTS START HERE
    builder.addCase(getAllComments.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getAllComments.fulfilled, (state, { payload }) => {
      state.allComments = payload.data;

      if (payload.success === false) {
        state.commentExist = false;
      } else {
        state.commentExist = true;
      }

      state.isLoading = false;
    });
    builder.addCase(getAllComments.rejected, (_, { payload }) => {
      console.log(payload);
    });
    //GET ALL COMMENTS END HERE
    //DELETE COMMENT START HERE
    builder.addCase(deleteComment.pending, () => {});
    builder.addCase(deleteComment.fulfilled, () => {});
    builder.addCase(deleteComment.rejected, () => {
      console.log("deleted denied.");
    });
    //DELETE COMMENT END HERE
    //PATCH COMMENT START HERE
    builder.addCase(patchComment.pending, () => {});
    builder.addCase(patchComment.fulfilled, (state) => {
      state.newCommentInfo = initialState.newCommentInfo;
    });
    builder.addCase(patchComment.rejected, () => {
      console.log("patching went wrong");
    });
    //PATCH COMMENT END HERE
  },
});

export const {
  handleChange,
  showCommentComponent,
  handleCommentEdit,
  clearCurrentCommentInfo,
  closeCommentComponent,
} = commentSlice.actions;
export default commentSlice.reducer;
