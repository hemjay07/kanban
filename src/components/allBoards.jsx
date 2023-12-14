import React, { useState } from "react";
import styled from "styled-components";
import boardIcon from "../assets/icon-board.svg";
import EditBoard from "./addNewBoard";
import { useSelector, useDispatch } from "react-redux";
import { boardSelected } from "../features/selectedBoardSlice";
export const BoardButton = styled.button`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  gap: 0.75rem;
  width: 95%;
  padding: 0.5rem 0 0.5rem 1rem;
  margin-right: auto;
  border-radius: 0rem 6.25rem 6.25rem 0rem;
  color: var(--Medium-Grey);
  background: transparent;
  border: none;
  text-align: left;
  font-size: 0.9375rem;
  font-weight: 700;

  &.create-new-board {
    color: var(--Main-Purple);
  }
  &:hover {
    color: var(--Main-Purple);
    background: var(--main-purple-hover);
  }
  &.clicked {
    color: var(--White);
    background: var(--Main-Purple);
  }
  &.hideSidebar,
  .create-new-board {
    margin-top: auto;
    background: red !important;
  }
`;
const StyledP = styled.p`
  margin-left: 2rem;
  color: var(--Medium-Grey, #828fa3);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
`;
export default function () {
  const [editBoard, setEditBoard] = useState(false);
  // const { selectedBoard, setSelectedBoard } = useContext(SelectedBoard);
  // get the board array from the store
  const boards = useSelector((state) => state.boards);

  // get the selected board from the store, if there is no selected board, set the selected board the first board on the list of baords
  let selectedBoard = useSelector((state) => state.selectedBoard);
  if (selectedBoard == "") {
    selectedBoard = boards[0].name;
  }

  // useDispatch from Redux toolkit to dispatch actions
  const dispatch = useDispatch();

  function selectBoard(name) {
    dispatch(boardSelected(name));
  }
  return (
    <>
      <StyledP>ALL BOARDS (8)</StyledP>
      {boards.map((board, index) => {
        return (
          <BoardButton
            key={index}
            onClick={() => selectBoard(board.name)}
            className={board.name == selectedBoard ? "clicked" : ""}
          >
            <img src={boardIcon} alt="Board Icon" />
            {board.name}
          </BoardButton>
        );
      })}

      <BoardButton
        className="create-new-board"
        onClick={() => setEditBoard(true)}
      >
        <img src={boardIcon} alt="Board Icon" />+ Create New Board
      </BoardButton>
      {editBoard && <EditBoard newBoard={"yes"} setEditBoard={setEditBoard} />}
    </>
  );
}
