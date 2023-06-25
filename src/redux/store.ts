import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import photoReducer from "./features/photoSlice";
import commentReducer from "./features/commentSlice";
import likeReducer from "./features/likeSlice";
import userProfileReducer from "./features/userProfileSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: userProfileReducer,
    photo: photoReducer,
    comment: commentReducer,
    likes: likeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
