import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Modal from "./modal";
import { EdittableInput, TitleInput } from "./inputs";
import { useDispatch } from "react-redux";
import { boardEdited } from "../features/boardSlice";
import { selectColumns, selectSelectedBoard } from "../features/selectors";
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

const Title = styled.div``;
export default function ({ setEditBoard }) {
  // the handleSubmit API from the useForm hook passes the data as arguement to the function it is called with

  // Redux toolkit
  // get the columns of the board, we need to prefill the board to be edited with the current state

  const col = selectColumns();
  const dispatch = useDispatch();
  const currentBoard = selectSelectedBoard();

  // React Hook Form
  // set the defaultValues values. Set the default values of the columns by the index, this makes sense since we later registered the columns using the index
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  let defaultValues = {};
  const boardName = selectSelectedBoard();
  defaultValues[boardName] = boardName;
  col.forEach((col, index) => {
    defaultValues[index] = col.name;
  });

  // Register the inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: { ...defaultValues, boardName },
  });

  // column logic
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // The number of columns need to ne dynamically created, cliking add new column would add a new column by calling a new editableInput and registering the input to react hook form. To delete a column, the X button is located in the editableInput so I passed the deletecolumn function as a prop which will be called when the button is clicked.

  // the columnIdRef is used to keep track of the columnId. When a new column added on attempt to edit the board, the id will start counting from col.length since the default columns have taken the ids up till that
  const columnIdRef = useRef(col.length);

  // Initialize the state to a number of columns equivalent to the number in the store
  const [columns, setColumns] = useState(() => {
    return col.map((col, index) => {
      const uniqueID = index;
      return {
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
      };
    });
  });
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Event handlers------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function onSubmit(data) {
    dispatch(boardEdited({ data, currentBoard }));
    setEditBoard(false);
  }

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
    setColumns((prev) =>
      prev.filter((column) => {
        return column.id != id;
      })
    );
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal visibilitySetter={setEditBoard} />
      <EditBoardContainer>
        <h3>Edit Board</h3>
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
        <SaveChangesButton>Save Changes</SaveChangesButton>
      </EditBoardContainer>
    </form>
  );
}
