import { useSelector } from "react-redux";
import { selectBoards } from "./boardSlice";

// Retrieves the currently selected board's name from the Redux state,
// if no board is selected, defaults to the first board's name or an empty string
export function selectSelectedBoard() {
  const boards = useSelector(selectBoards);
  let selectedBoard = useSelector((state) =>
    state.selectedBoard.replace(/\s+/g, "")
  );
  if (selectedBoard == "") {
    selectedBoard = Object.values(boards)[0]?.name || "";
  }
  return selectedBoard;
}

// Selects the current board object based on the name of the selected board
export function selectBoard() {
  const currentBoardName = selectSelectedBoard();
  const boards = useSelector(selectBoards);
  const currentBoard = boards[currentBoardName];
  return currentBoard;
}

// Retrieves an array of column objects from the current board
export function selectColumns() {
  const currentBoard = selectBoard();
  const columns = currentBoard ? Object.values(currentBoard.columns) : [];
  return columns;
}

// Retrieves an array of subtask Ids for a given task Id from the current board
export function selectSubtaskIds(taskId) {
  const currentBoard = selectBoard();
  const ids = Object.keys(currentBoard.tasks[taskId].subtasks);
  return ids;
}

// Returns an array of all board objects from the Redux state
export function boardsArray() {
  return Object.values(useSelector(selectBoards));
}
