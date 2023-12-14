// Memoize these selectors using createSelector

import { useSelector } from "react-redux";
import { selectBoards } from "./boardSlice";

export function selectSelectedBoard() {
  const boards = useSelector(selectBoards);
  let selectedBoard = useSelector((state) => state.selectedBoard);
  if (selectedBoard == "") {
    selectedBoard = boards[0].name;
  }
  return selectedBoard;
}

export function selectColumns() {
  const currentBoard = selectSelectedBoard();
  const boards = useSelector(selectBoards);
  const columns = boards.filter((board) => board.name == currentBoard)[0]
    .columns;
  return columns;
}
