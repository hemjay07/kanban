import React, { useContext, useState } from "react";
import styled from "styled-components";
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

export const EllipsisDropDown = styled.div`
  position: absolute;
  top: 4rem;
  right: -5rem;
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

export default function ({ setViewTask, setDeleteTask, setEditTask }) {
  // console.log(view);

  const [showDropDown, setShowDropDown] = useState(false);
  //   delete

  function handleEdit() {
    setEditTask(true);
    setShowDropDown((prev) => !prev);
    setViewTask(false);
  }
  function handleDelete() {
    setDeleteTask(true);
    setShowDropDown((prev) => !prev);
    setViewTask(false);
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
            <h3 onClick={handleEdit}>Edit Task</h3>
          </div>
          <div>
            <h3 onClick={handleDelete}>Delete Task</h3>
          </div>
        </EllipsisDropDown>
      )}
      {/* There was a challenge here The edit modal is a child of the viewTask modal
      and when we call the onclick callback it set the viewTask modal to false
      so that only the editB The delete modal will show fine and calling the
      setIsDelete function wont unmount the */}
    </>
  );
}
//
