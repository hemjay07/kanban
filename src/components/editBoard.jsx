import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Modal from "./modal";
import { EdittableInput, TitleInput } from "./inputs";
import { useDispatch, useSelector } from "react-redux";
import { boardEdited, newBoardCreated } from "../features/boardSlice";
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
  const col = selectColumns();
  console.log(col, "aoghnwog");
  // React Hook Form
  let defaultValues = {};
  const boardName = selectSelectedBoard();
  defaultValues[boardName] = boardName;
  col.forEach((col, index) => {
    defaultValues[index] = col.name;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: { ...defaultValues, boardName },
  });
  // console.log(errors[1]);
  // the handleSubmit API from the useForm hook passes the data as arguement to the function it is called with

  // Redux toolkit
  const dispatch = useDispatch();

  function onSubmit(data) {
    console.log(data);
    console.log(errors);
    dispatch(boardEdited(data));
  }

  function addNewColumn() {
    columnIdRef.current = columnIdRef.current + 1;
    const uniqueID = columnIdRef.current;

    setColumns((prev) => {
      // console.log(prev, uniqueID, "prevvvvvvv", errors[`${uniqueID}}`]);

      return [
        ...prev,
        {
          id: uniqueID,
          jsx: (
            <div key={uniqueID} style={{ position: "relative" }}>
              <EdittableInput
                // unregister={unregister}
                // error={errors[`${uniqueID}}`]}
                // setnumberofcolumns={setNumberOfColumns}
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
  // column logic
  // The number of columns need to ne dynamically created, cliking add new column would add a new column by calling a new editableInput and registering the input to react hook form. To delete a column, the X button is located in the editableInput so I passed the deletecolumn function as a prop which will be called when the button is clicked.
  const columnIdRef = useRef(col.length);
  const [columns, setColumns] = useState(() => {
    // const uniqueID = columnIdRef.current;
    return col.map((col, index) => {
      const uniqueID = index;
      return {
        id: uniqueID,
        jsx: (
          <div key={uniqueID} style={{ position: "relative" }}>
            <EdittableInput
              // unregister={unregister}
              error={errors[`${uniqueID}}`]}
              // setnumberofcolumns={setNumberOfColumns}
              removecolumn={removeColumn}
              id={uniqueID}
              {...register(`${uniqueID}`, { required: "Can’t be empty" })}
            />
          </div>
        ),
      };
    });

    // <div style={{ position: "relative" }}>
    //   <EdittableInput
    //     // unregister={unregister}
    //     error={errors[`${uniqueID}}`]}
    //     // setnumberofcolumns={setNumberOfColumns}
    //     key={uniqueID}
    //     id={uniqueID}
    //     {...register(`${uniqueID}`, { required: "Can’t be empty" })}
    //   />
    // </div>,
  });

  // console.log("parent rerendered as well");
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