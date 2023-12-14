import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";
import selectedBoardReducer from "../features/selectedBoardSlice";
export const store = configureStore({
  reducer: {
    boards: boardReducer,
    selectedBoard: selectedBoardReducer,
  },
});
