import React, { useState } from "react";
import styled from "styled-components";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import EditBoard from "./editBoard";
import DeleteBoard from "./deleteBoard";

export const EllipsisDropDown = styled.div`
  position: absolute;
  top: 4rem;
  right: 3rem;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  padding: 1rem 0;
  background: var(--primary);
  width: 12rem;
  height: 5.875rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
  div {
    padding: 0.5rem 0 0.5rem 1rem;

    &:hover {
      cursor: pointer;
      background: var(--main-purple-hover);
    }
    &:first-child {
      color: var(--Medium-Grey, #828fa3);
    }
    &:last-child {
      color: var(--Red);
    }
  }
  h3 {
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }
`;

export default function ({}) {
  // Initialize state for dropdown visibility
  const [showDropDown, setShowDropDown] = useState(false);

  // Initialize state for edit board modal visibility
  const [editBoard, setEditBoard] = useState(false);

  // Initialize state for delete board modal visibility
  const [deleteBoard, setDeleteBoard] = useState(false);
  // State to manage delete board action - initialized but unused in the shown code

  // Handler function to set edit board modal to visible and toggle dropdown visibility
  function handleEdit() {
    setEditBoard(true); // Show edit board modal
    setShowDropDown((prev) => !prev); // Toggle dropdown visibility
    // toggle log visibility - commented out
  }

  // Handler function to set delete board modal to visible and toggle dropdown visibility
  function handleDelete() {
    setDeleteBoard(true); // Show delete board modal
    setShowDropDown((prev) => !prev); // Toggle dropdown visibility
  }

  // Component render method
  return (
    <>
      {/* Trigger for showing dropdown menu */}
      <img
        src={verticalEllipsis}
        alt=""
        onClick={() => setShowDropDown((prev) => !prev)} // Toggle dropdown on click
        style={{ cursor: "pointer" }}
      />
      {/* Dropdown menu for editing and deleting boards */}
      {showDropDown && (
        <EllipsisDropDown>
          <div>
            <h3 onClick={handleEdit}>Edit Board</h3>{" "}
            {/* Option to edit the board */}
          </div>
          <div>
            <h3 onClick={handleDelete}>Delete Board</h3>{" "}
            {/* Option to delete the board */}
          </div>
        </EllipsisDropDown>
      )}
      {deleteBoard && <DeleteBoard setDeleteBoard={setDeleteBoard} />}{" "}
      {editBoard && <EditBoard setEditBoard={setEditBoard} />}{" "}
    </>
  );
}
