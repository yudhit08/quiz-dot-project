import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import highScoreSlice from "./slices/highScoreSlice";
import quizSlice from "./slices/quizSlice";
import timerSlice from "./slices/timerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    highscore: highScoreSlice,
    quiz: quizSlice,
    timer: timerSlice
  }
})