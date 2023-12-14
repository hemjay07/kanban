import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const selectedBoardSlice = createSlice({
  name: "selectedBoardSlice",
  initialState,
  reducers: {
    boardSelected(state, action) {
      // This initial state isnt draftable by immer and wont therefore be wrapped in produce so we cant mutate it, I therefore have to return it

      return action.payload;
    },
  },
});
export const selectedBoard = (state) => state.selectedBoard;
export const { boardSelected } = selectedBoardSlice.actions;
export default selectedBoardSlice.reducer;
