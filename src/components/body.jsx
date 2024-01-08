import React, { useState } from "react";
import styled from "styled-components";
import showSidebar from "../assets/icon-show-sidebar.svg";
import Column from "./column";
import { AddTaskButton } from "./navbar";
import EditBoard from "./editBoard";

import { selectBoard, selectColumns } from "../features/selectors";

const BodyContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  overflow: auto;
  // border: solid 2px red;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;

  h2 {
    color: var(--Medium-Grey, #828fa3);
    text-align: center;
    font-size: 1.125rem;
    font-weight: 700;
    min-width: 500px;
  }
`;
const ShowSidebarButton = styled.div`
  position: fixed;
  left: 0;
  bottom: 1.15rem;
  background: var(--Main-Purple);
  padding: 0.8rem;
  border-radius: 0 1rem 1rem 0;
  &:hover {
    background: var(--main-purple-hover) !important;
  }
`;
const AddNewColumn = styled.div`
  min-width: 17rem;
  background: var(--primary);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  color: var(--Medium-Grey, #828fa3);
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
    color: var(--Main-Purple);
  }
`;
const EmptyBoard = styled.div`
  // border: solid 2px red;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2rem;
  h3 {
    color: var(--Medium-Grey, #828fa3);
    font-family: Plus Jakarta Sans;
    font-size: 1.125rem;
    font-weight: 700;
  }
`;
const AddNewColumnButton = AddTaskButton;
export default function ({ isSidebar, setIsSidebar }) {
  // this state is for the edit board modal which is displayed when add new column is clicked
  const [editBoard, setEditBoard] = useState(false);
  const currentBoard = selectBoard();

  const columns = selectColumns();

  return (
    <BodyContainer>
      {/* there is a small button on the body by the bottom left that enables user to shoe the sidebar */}
      {!isSidebar && (
        <ShowSidebarButton onClick={() => setIsSidebar(true)}>
          <img src={showSidebar} alt="" />
        </ShowSidebarButton>
      )}
      {
        /* if there are no columns, display an empty board with this content */
        columns?.length == 0 && (
          <>
            <EmptyBoard>
              <h3>This board is empty. Create a new column to get started.</h3>
              <AddNewColumnButton
                disabled={currentBoard ? false : true}
                onClick={() => setEditBoard(true)}
              >
                + Add New Column
              </AddNewColumnButton>
            </EmptyBoard>{" "}
            {editBoard && <EditBoard setEditBoard={setEditBoard} />}
          </>
        )
      }
      {columns?.map((column, index) => {
        return <Column key={index} columnData={column} />;
      })}
      {columns?.length > 0 && (
        <>
          <AddNewColumn onClick={() => setEditBoard(true)}>
            + New Column
          </AddNewColumn>
          {editBoard && <EditBoard setEditBoard={setEditBoard} />}
        </>
      )}
      {/* <button>+ Add New Column</button> */}
    </BodyContainer>
  );
}
