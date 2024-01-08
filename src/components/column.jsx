import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import tinycolor from "tinycolor2";
import { selectBoard } from "../features/selectors";

// Define styled-component for ColumnContainer with necessary styles
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 17rem;
  min-width: 17rem;
  //   border: solid 2px red; // Uncomment to see a red border for troubleshooting
  padding: 1rem 0;

  &.empty {
    border: dashed 1px var(--text-color);
    border-radius: 5px;
    padding: 1rem;
  }
`;

// Define styled-component for Title with applied styles
const Title = styled.div`
  color: var(--Medium-Grey, #828fa3);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
`;

// This function component is responsible for rendering a column with its tasks
export default function ({ columnData }) {
  // Generates a random color in hex format using tinycolor2 library
  function getRandomColor() {
    const color = tinycolor.random();
    return color.toHexString();
  }

  // Select the current board state using predefined selector
  const presentBoard = selectBoard();
  // Extract tasks as an array or default to an empty array if none present
  const tasks = presentBoard.tasks ? Object.values(presentBoard.tasks) : [];
  // Determine if ColumnContainer should receive 'empty' class based on tasks
  const empty = tasks ? "" : "empty";
  // Extract the name of the column from passed props
  const columnName = columnData.name;

  return (
    <ColumnContainer className={empty}>
      <Title>
        <span
          style={{
            backgroundColor: `${getRandomColor()}`, // Generates a random background color for the circle
            width: "0.9rem",
            height: "0.9rem",
            display: "inline-block",
            borderRadius: "50%", // Makes the shape a circle
            marginRight: "0.7rem",
          }}
        ></span>
        {columnData.name} {/* Display the name of the column */}
      </Title>

      {/* Iterate over tasks and render TaskCard only for those matching the column name */}
      {tasks?.map((task, index) => {
        if (task.status == columnName) {
          return (
            <TaskCard key={index} taskData={task} columnName={columnName} />
          );
        }
      })}
    </ColumnContainer>
  );
}
