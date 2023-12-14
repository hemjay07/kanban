import React from "react";
import styled from "styled-components";
import Modal from "./modal";
// import {subsc}
import {
  DescriptionInput,
  EdittableInput,
  SelectorInput,
  TitleInput,
} from "./inputs";
const EditTaskContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--primary);
  width: 85vw;
  max-width: 30rem;
  height: 41.1875rem;
  max-height: 80vh;
  overflow-x: auto;
  z-index: 2;
  border-radius: 5px;
  h3 {
    color: var(--text-color);
    font-size: 1.125rem;
    font-weight: 700;
  }
  p {
    color: var(--text-color);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
  }
`;
const SaveChangesButton = styled.button`
  width: 100%;
  border-radius: 1.25rem;
  background: var(--Main-Purple);
  border: none;
  padding: 0.5rem;
  color: var(--White);
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.4375rem;
`;

const Subtask = styled.div`
  button {
    width: 100%;
    margin-top: 0.8rem;
    border: none;
    border-radius: 1.25rem;

    color: var(--Main-Purple);
  }
`;

const Status = styled.div``;
const Title = styled.div`
  // border: solid 2px red;
`;
const Description = styled.div``;

// The setEdit prop is used to display the modal, the newTask is used to indicate if this is a new task or you are trying to edit a task, the selected either "none" (for a new task which of course has no status yet) or the status (taskData.status) which is the column the task belongs in

export default function ({ setEdit, newTask, selected }) {
  return (
    <>
      <Modal visibilitySetter={setEdit} />
      <EditTaskContainer>
        {newTask ? <h3>Add New Task</h3> : <h3>Edit Task</h3>}
        <Title>
          <p>Title</p>
          <TitleInput />
        </Title>
        <Description>
          <p>Description</p>
          <DescriptionInput />
        </Description>
        <Subtask>
          <p>Subtasks</p>
          <EdittableInput />
          <EdittableInput />
          <button>+ Add New Subtask</button>
        </Subtask>
        <Status>
          <h3></h3>
          <SelectorInput selected={selected} />
        </Status>{" "}
        {newTask ? (
          <SaveChangesButton>Create Task</SaveChangesButton>
        ) : (
          <SaveChangesButton>Save Changes</SaveChangesButton>
        )}
      </EditTaskContainer>
    </>
  );
}
