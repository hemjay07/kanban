// Memoize these selectors using createSelector

import { useSelector } from "react-redux";
import { selectBoards } from "./boardSlice";

export function selectSelectedBoard() {
  const boards = useSelector(selectBoards);
  let selectedBoard = useSelector((state) => state.selectedBoard);
  if (selectedBoard == "") {
    selectedBoard = Object.values(boards)[0]?.name || "";
  }
  return selectedBoard;
}

export function selectColumns() {
  const currentBoardName = selectSelectedBoard();
  const boards = useSelector(selectBoards);
  const currentBoard = Object.values(boards).filter(
    (board) => board.name == currentBoardName
  )[0];

  const columns = currentBoard ? Object.values(currentBoard.columns) : [];

  return columns;
}

export function boardsArray() {
  return Object.values(useSelector(selectBoards));
}
