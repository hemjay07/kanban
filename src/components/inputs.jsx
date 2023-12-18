// This comopnent contains the logic for the input fields, I used forward ref to make the ref of the input to the component so that it can be used by React-Hook-Form

import React, { useState, forwardRef, useEffect } from "react";
import styled from "styled-components";
import cancel from "../assets//icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { boardsArray, selectSelectedBoard } from "../features/selectors";
import { selectBoards } from "../features/boardSlice";

// title
const StyledTitleInput = styled.input`
  background: var(--primary);
  width: 100%;
  padding: 0.5rem 0 0.5rem 1rem;
  margin-top: 0.5rem;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 5px;
  color: var(--text-color);
`;
const StyledP = styled.p`
  display: block;
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: var(--Red, #ea5555) !important;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
`;
export const TitleInput = forwardRef((props, ref) => {
  return (
    <>
      <StyledTitleInput {...props} ref={ref} type="text" />
      {props.error && <StyledP>Can't be empty</StyledP>}
    </>
  );
});

// description
const StyledDescriptionTextarea = styled.textarea`
  resize: none;
  width: 26rem;
  max-width: 100%;
  height: 7rem;
  margin-top: 0.5rem;
  background: var(--primary);

  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 5px;
  color: var(--text-color);
  padding: 0.5rem 1rem;
`;
export const DescriptionInput = forwardRef((props, ref) => {
  return <StyledDescriptionTextarea {...props} ref={ref} />;
});

// edittable
const StyledEdittableInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.7rem;

  p:first-of-type {
    font-size: 1rem;
    color: var(--Medium-Grey, #828fa3);
    &:hover {
      color: var(--Red);
      cursor: pointer;
    }
  }
  input {
    width: 94%;
    padding: 0.5rem 0 0.5rem 1rem;
    background: var(--primary);
    border: 1px solid rgba(130, 143, 163, 0.25);
    border-radius: 5px;
    color: var(--text-color);
  }
`;
const EdittableP = styled.p`
  display: block;
  position: absolute;
  right: 2rem;
  top: 0.5rem;
  color: var(--Red, #ea5555) !important;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
`;
export const EdittableInput = forwardRef((props, ref) => {
  return (
    <StyledEdittableInput>
      <input {...props} type="text" ref={ref} />
      <p onClick={() => props.removecolumn(props.id)}>X</p>
      {/* {props.error && <EdittableP>Can't be empty</EdittableP>} */}
    </StyledEdittableInput>
  );
});

//Select
const StyledSelect = styled.select`
  margin-top: 1rem;
  width: 100%;
  background: var(---background);
  color: var(--text-color);
  padding: 1rem;
  padding-right: 2rem;

  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
  border-radius: 5px;
`;

export const SelectorInput = forwardRef((props, ref) => {
  const boards = boardsArray();
  const selectedBoard = selectSelectedBoard();

  // Get the particular board that is being worked on
  const availableBoard = boards.filter(
    (board) => board.name == selectedBoard
  )[0];

  // get all the available columns for this board
  const availableColumns = availableBoard
    ? Object.keys(availableBoard.columns)
    : [];
  const options = availableColumns;

  // The default selected option is the status of the task. If there is no selected option, that is "selected" is "none" set the default selected option to the first option
  const [selectedOption, setSelectedOption] = useState(
    props.selected == "none" ? options[0] : props.selected
  );

  const handleDropdownChange = (event) => {
    event.preventDefault();

    // if the parent component is sending a prop for status change, change the status
    if (props.statusChange) {
      props.statusChange(event);
    }
    setSelectedOption(event.target.value);
  };
  return (
    <StyledSelect
      {...props}
      ref={ref}
      value={selectedOption}
      onChange={handleDropdownChange}
      StatusChange={props.change}
    >
      {options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
});
