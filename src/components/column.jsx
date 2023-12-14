import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import tinycolor from "tinycolor2";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 17rem;
  min-width: 17rem;
  //   border: solid 2px red;
`;
const Title = styled.div`
  color: var(--Medium-Grey, #828fa3);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
`;
export default function ({ columnData }) {
  // tinycolor2 is a package that helps generate random colors. I used this to generate the color label for each column
  function getRandomColor() {
    const color = tinycolor.random();
    return color.toHexString();
  }
  const taskColor = getRandomColor();
  const tasks = columnData.tasks;
  const columnName = columnData.name;
  return (
    <ColumnContainer>
      <Title>
        <span
          style={{
            backgroundColor: `${getRandomColor()}`,
            width: "0.9rem",
            height: "0.9rem",
            display: "inline-block",
            borderRadius: "50%",
            marginRight: "0.7rem",
          }}
        ></span>
        {columnData.name}
      </Title>

      {tasks?.map((task, index) => {
        return <TaskCard key={index} taskData={task} columnName={columnName} />;
      })}
    </ColumnContainer>
  );
}
