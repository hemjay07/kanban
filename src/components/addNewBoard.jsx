import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Modal from "./modal";
import { EdittableInput, TitleInput } from "./inputs";
import { useDispatch } from "react-redux";
import { newBoardCreated } from "../features/boardSlice";
import column from "./column";
const EditBoardContainer = styled.div`
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
  // height: 41.1875rem;
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

const Columns = styled.div`
  button {
    width: 100%;
    margin-top: 0.8rem;
    border: none;
    border-radius: 1.25rem;

    color: var(--Main-Purple);
  }
`;

const Title = styled.div`
  // border: solid 2px red;
`;
export default function ({ setEditBoard }) {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: true, defaultValues: {} });
  // the handleSubmit API from the useForm hook passes the data as arguement to the function it is called with

  // Redux toolkit
  const dispatch = useDispatch();

  function onSubmit(data) {
    dispatch(newBoardCreated(data));
  }

  // column logic-------------------------------------
  // The number of columns need to ne dynamically created, cliking add new column would add a new column by calling a new editableInput and registering the input to react hook form. To delete a column, the X button is located in the editableInput so I passed the deletecolumn function as a prop which will be called when the button is clicked.
  const columnIdRef = useRef(1);
  const [columns, setColumns] = useState(() => {
    // This is the state that represents the columns, it is initialized with 1 edittable input that has an Id of 1 ( the  ref.current is initialized to 1) and it is dynamically registered usign the Id as the name.

    // Adding or removing columns will append to this array or remove from it based on the id. This is what the removecolumn and add column funciton do

    const uniqueID = columnIdRef.current;
    return [
      {
        id: uniqueID,
        jsx: (
          <div key={uniqueID} style={{ position: "relative" }}>
            <EdittableInput
              error={errors[`${uniqueID}}`]}
              removecolumn={removeColumn}
              id={uniqueID}
              {...register(`${uniqueID}`, { required: "Can’t be empty" })}
            />
          </div>
        ),
      },
    ];
  });
  function addNewColumn() {
    columnIdRef.current = columnIdRef.current + 1;
    const uniqueID = columnIdRef.current;

    setColumns((prev) => {
      return [
        ...prev,
        {
          id: uniqueID,
          jsx: (
            <div key={uniqueID} style={{ position: "relative" }}>
              <EdittableInput
                removecolumn={removeColumn}
                id={uniqueID}
                {...register(`${uniqueID}`, { required: "Can’t be empty" })}
              />
            </div>
          ),
        },
      ];
    });
  }
  function removeColumn(id) {
    // Remover the column from the array of columns based on the id passed
    setColumns((prev) =>
      prev.filter((column) => {
        return column.id != id;
      })
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal visibilitySetter={setEditBoard} />
      <EditBoardContainer>
        <h3>Add New Board</h3>
        <Title>
          <p>Board Name</p>
          <div style={{ position: "relative" }}>
            <TitleInput
              error={errors["boardName"]}
              {...register("boardName", { required: "Can’t be empty" })}
            />
          </div>
        </Title>
        <Columns>
          <p>Board Columns</p>
          {columns.map((column) => {
            return column.jsx;
          })}
          <button type="button" onClick={() => addNewColumn()}>
            + Add New Columns
          </button>
        </Columns>

        <SaveChangesButton type="submit">Create New Board</SaveChangesButton>
      </EditBoardContainer>
    </form>
  );
}
