import React, { useState } from "react";
import styled from "styled-components";
import boardIcon from "../assets/icon-board.svg";
import EditBoard from "./addNewBoard";
import { useDispatch } from "react-redux";
import { boardSelected } from "../features/selectedBoardSlice";
import { boardsArray, selectSelectedBoard } from "../features/selectors";

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
  }
  p {
    &::first-letter {
      text-transform: uppercase;
    }
  }
`;
const StyledP = styled.p`
  margin-left: 2rem;
  color: var(--Medium-Grey, #828fa3);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
`;
export default function ({ setIsMobileDropDown }) {
  const [editBoard, setEditBoard] = useState(false);
  // const { selectedBoard, setSelectedBoard } = useContext(SelectedBoard);
  // get the board array from the store
  const boards = boardsArray();
  const selectedBoard = selectSelectedBoard();
  //  get the total number of boards from the store

  // useDispatch from Redux toolkit to dispatch actions
  const dispatch = useDispatch();

  function selectBoard(name) {
    name = name.replace(/\s+/g, "");
    dispatch(boardSelected(name));
  }
  return (
    <>
      <StyledP>ALL BOARDS ({boards.length})</StyledP>
      {boards.map((board, index) => {
        return (
          <BoardButton
            key={index}
            onClick={() => {
              selectBoard(board.name);
              setIsMobileDropDown ? setIsMobileDropDown(false) : null;
            }}
            className={
              board.name.replace(/\s+/g, "") == selectedBoard ? "clicked" : ""
            }
          >
            <img src={boardIcon} alt="Board Icon" />
            <p> {board.name}</p>
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
