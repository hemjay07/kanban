import { configureStore } from "@reduxjs/toolkit"; // Import configureStore function from Redux Toolkit
import boardReducer from "../features/boardSlice"; // Import the boardReducer function from the board slice
import selectedBoardReducer from "../features/selectedBoardSlice"; // Import the selectedBoardReducer function from the selected board slice

// Create the Redux store by configuring it with different reducers
export const store = configureStore({
  reducer: {
    boards: boardReducer, // Attaching boardReducer to the 'boards' state
    selectedBoard: selectedBoardReducer, // Attaching selectedBoardReducer to the 'selectedBoard' state
  },
});
