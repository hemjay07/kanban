import React, { Suspense, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./modal";
import { useForm } from "react-hook-form";
// import {subsc}
import {
  DescriptionInput,
  EdittableInput,
  SelectorInput,
  TitleInput,
} from "./inputs";
import { useDispatch } from "react-redux";
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

export default function ({ setAddNewTask, selected }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: true, defaultValues: {} });

  const dispatch = useDispatch;

  function onSubmit(data) {
    console.log(data);
    dispatch(newTaskCreated(data));
  }
  const subtaskIdRef = useRef(1);

  const [subtasks, setSubtasks] = useState(() => {
    // This is the state that represents the columns, it is initialized with 1 edittable input that has an Id of 1 ( the  ref.current is initialized to 1) and it is dynamically registered usign the Id as the name.

    // Adding or removing columns will append to this array or remove from it based on the id. This is what the removecolumn and add column funciton do
    const uniqueId = subtaskIdRef.current;
    return [
      {
        id: uniqueId,
        jsx: (
          <EdittableInput
            key={uniqueId}
            id={uniqueId}
            error={errors[`${uniqueId}}`]}
            removecolumn={removeColumn}
            {...register(`${uniqueId}`, { required: "Can’t be empty" })}
          />
        ),
      },
    ];
  });

  function addSubtask() {
    setSubtasks((prev) => {
      subtaskIdRef.current = subtaskIdRef.current + 1;
      const uniqueId = subtaskIdRef.current;
      return [
        ...prev,
        {
          // this is a new subtask, the id is created by adding 1 to the current ref
          id: uniqueId,
          jsx: (
            <EdittableInput
              key={uniqueId}
              error={errors[`${uniqueId}}`]}
              id={uniqueId}
              removecolumn={removeColumn}
              {...register(`${uniqueId}`, { required: "Can’t be empty" })}
            />
          ),
        },
      ];
    });
  }
  function removeColumn(id) {
    setSubtasks((prev) =>
      prev.filter((subtask) => {
        return subtask.id != id;
      })
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal visibilitySetter={setAddNewTask} />
      <EditTaskContainer>
        <h3>Add New Task</h3>
        <Title>
          <p>Title</p>
          {/* this div helps to contain the title error message inside the title */}
          <div style={{ position: "relative" }}>
            <TitleInput
              {...register("Title", { required: "Can’t be empty" })}
              error={errors["Title"]}
            />
          </div>
        </Title>
        <Description>
          <p>Description</p>
          <DescriptionInput {...register("Description")} />
        </Description>
        <Subtask>
          <p>Subtasks</p>
          {subtasks.map((subtask) => {
            return subtask.jsx;
          })}
          <button type="button" onClick={addSubtask}>
            + Add New Subtask
          </button>
        </Subtask>
        <Status>
          <h3></h3>
          <SelectorInput selected={selected} {...register("status")} />
        </Status>
        <SaveChangesButton type="submit">Create Task</SaveChangesButton>
      </EditTaskContainer>
    </form>
  );
}
