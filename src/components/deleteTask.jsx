import React from "react";
import styled from "styled-components";
import Modal from "./modal";
const DeleteContainer = styled.div`
  width: 21.4375rem;
  height: 17.75rem;
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
    &:first-of-type {
      border-radius: 1.25rem;
      background: var(--Red);
    }
    &:last-of-type {
      border-radius: 1.25rem;
      background: var(--Medium-Grey, #828fa3);
      margin-top: 1rem;
    }
  }
`;
const Buttons = styled.div``;
export default function ({ setDeleteTask, taskData }) {
  return (
    <>
      <Modal visibilitySetter={setDeleteTask} />
      <DeleteContainer>
        <h3>Delete this task ?</h3>
        <p>
          Are you sure you want to delete the ‘Build settings UI’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <Buttons>
          <button>Delete</button>
          <button onClick={() => setDeleteTask(false)}>Cancel</button>
        </Buttons>
      </DeleteContainer>
    </>
  );
}