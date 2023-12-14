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
  // console.log(view);

  const [showDropDown, setShowDropDown] = useState(false);
  const [editBoard, setEditBoard] = useState(false);
  const [deleteBoard, setDeleteBoard] = useState(false);
  //   delete

  function handleEdit() {
    setEditBoard(true);
    setShowDropDown((prev) => !prev);
    // console.log(setViewTaskDisplay);
  }
  function handleDelete() {
    setDeleteBoard(true);
    setShowDropDown((prev) => !prev);
    console.log(editType, "handle dlete");
  }
  return (
    <>
      <img
        src={verticalEllipsis}
        alt=""
        onClick={() => setShowDropDown((prev) => !prev)}
        style={{ cursor: "pointer" }}
      />
      {showDropDown && (
        <EllipsisDropDown>
          <div>
            {" "}
            <h3 onClick={handleEdit}>Edit Board</h3>
          </div>
          <div>
            {" "}
            <h3 onClick={handleDelete}>Delete Board</h3>
          </div>
        </EllipsisDropDown>
      )}
      {/* There was a challenge here The edit modal is a child of the viewTask modal
      and when we call the onclick callback it set the viewTask modal to false
      so that only the editB The delete modal will show fine and calling the
      setIsDelete function wont unmount the */}
      {deleteBoard && <DeleteBoard setDeleteBoard={setDeleteBoard} />}
      {editBoard && <EditBoard setEditBoard={setEditBoard} />}
    </>
  );
}
//
