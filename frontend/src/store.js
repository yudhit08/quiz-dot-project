import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import highScoreSlice from "./slices/highScoreSlice";
import quizSlice from "./slices/quizSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    highscore: highScoreSlice,
    quiz: quizSlice
  }
})