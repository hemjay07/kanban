import React from "react";
import styled from "styled-components";
import Modal from "./modal";
import { selectSelectedBoard } from "../features/selectors";
import { useDispatch } from "react-redux";
import { boardDeleted } from "../features/boardSlice";

// Styled component for delete confirmation container
const DeleteContainer = styled.div`
  width: 21.4375rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--background);
  border-radius: 5px;
  z-index: 2;
  h3 {
    color: var(--Red, #ea5555);
    font-size: 1.125rem;
    font-weight: 700;
  }
  p {
    color: var(--Medium-Grey, #828fa3);
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem; /* 176.923% */
  }
  button {
    width: 100%;
    border: none;
    color: var(--text-color);
    &:first-of-type {
      border-radius: 1.25rem;
      background: var(--Red);
    }
    &:last-of-type {
      border-radius: 1.25rem;
      background: var(--Medium-Grey, #828fa3);
      margin-top: 1rem;
    }
    &:first-of-type:hover {
      background-color: var(--red-hover);
    }
    &:last-of-type:hover {
      opacity: 0.6;
    }
  }
`;

// Another styled component for buttons container
const Buttons = styled.div``;

// The functional component for deleting a board
export default function ({ setDeleteBoard }) {
  // Fetch the currently selected board
  const currentBoard = selectSelectedBoard();
  // Hook to access the redux dispatch function
  const dispatch = useDispatch();

  // Function to handle the deletion of a board
  function handleDelete() {
    // Dispatch an action to delete the chosen board
    dispatch(boardDeleted(currentBoard));
  }

  return (
    <>
      {/* Modal component that can be shown or hidden */}
      <Modal visibilitySetter={setDeleteBoard} />

      {/* Delete confirmation pop-up container */}
      <DeleteContainer>
        <h3>Delete this Board ?</h3>
        <p>
          {/* Message asking for confirmation of board deletion */}
          Are you sure you want to delete the{currentBoard} board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
        {/* Container for the buttons */}
        <Buttons>
          {/* Delete button with attached event handler */}
          <button
            onClick={() => {
              handleDelete(); // Call the handleDelete function
              setDeleteBoard(false); // Hide the delete confirmation pop-up
            }}
          >
            Delete
          </button>
          {/* Cancel button to close the confirmation pop-up without deleting */}
          <button onClick={() => setDeleteBoard(false)}>Cancel</button>
        </Buttons>
      </DeleteContainer>
    </>
  );
}
