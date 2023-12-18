import React, { useState, useContext } from "react";
import styled from "styled-components";
import MobileDropDown from "./mobileDropDown";
import logo from "../assets/logo-mobile.svg";
import lightLogo from "../assets/logo-dark.svg";
import darkLogo from "../assets/logo-light.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import BoardDropDown from "./boardDropDown";
import AddNewTask from "./addNewTask";
import { SelectedBoard } from "../app/App";
import data from "../data.json";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../features/selectors";

const Container = styled.div`
  // border: solid 2px red;
  height: 10rem;
  background: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--lines);
  @media (max-width: 768px) {
    padding: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    .board-title {
      color: var(--text-color);
      font-size: 1.5rem;
      font-weight: 700;
      margin-left: 1.5rem;
    }

    padding-right: 2rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const LeftHalf = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const RightHalf = styled.div`
  // position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LightLogo = styled.img`
  border-right: solid 1px var(--lines);
  padding: 1.5rem;
  margin-top: 0;
`;
const DarkLogo = styled.img`
  border-right: solid 1px var(--lines);
  padding: 1.5rem;
`;
export const AddTaskButton = styled.button`
  border: none;
  padding: 0 1rem;
  border-radius: 1.5rem;
  background: var(--Main-Purple, #635fc7);
  color: var(--White);
  &:hover {
    background: var(--main-purple-hover) !important;
  }
  &[disabled] {
    opacity: 0.25;
    background: var(--Main-Purple, #635fc7) !important;
  }
`;
const MobileAddTaskButton = styled.button`
  border: none;
  color: var(--White);
  text-align: center;
  justify-content: center;
  align-items: center;
  background: var(--Main-Purple) !important;
  cursor: pointer;
  padding: 0 1rem;
  font-size: 1.5rem;
  border-radius: 20px;
  &[disabled] {
    opacity: 0.25;
  }
`;

export default function ({ isSidebar, isMobileDropDown, setIsMobileDropDown }) {
  const boards = useSelector((state) => state.boards);
  const seleced = useSelector((state) => state.selectedBoard);
  const [addNewTask, setAddNewTask] = useState(false);
  const selectedBoard = selectSelectedBoard();
  return (
    <Container>
      <LeftHalf>
        <img src={logo} className="mobile-only" alt="" />
        {!isSidebar && (
          <>
            <DarkLogo
              src={darkLogo}
              className="not-on-mobile dark-theme-only"
              alt=""
            />
            <LightLogo
              src={lightLogo}
              className="not-on-mobile light-theme-only"
              alt=""
            />
          </>
        )}

        <h2 className={"board-title"}>{selectedBoard}</h2>
        <img
          src={chevronDown}
          className="mobile-only"
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => {
            return setIsMobileDropDown(true);
          }}
        />

        {isMobileDropDown && (
          <MobileDropDown
            isMobileDropDown={isMobileDropDown}
            setIsMobileDropDown={setIsMobileDropDown}
          />
        )}
      </LeftHalf>
      <RightHalf>
        <MobileAddTaskButton
          className="mobile-only"
          onClick={() => {
            setAddNewTask(true);
          }}
          // if there are no boards present, disable the button
          disabled={data.boards.length > 0 ? false : true}
        >
          +
        </MobileAddTaskButton>

        <AddTaskButton
          onClick={() => {
            setAddNewTask(true);
          }}
          className="not-on-mobile"
          // if there are no boards present, disable the button
          disabled={data.boards.length > 0 ? false : true}
        >
          + Add New Task
        </AddTaskButton>
        {addNewTask && (
          <AddNewTask setAddNewTask={setAddNewTask} selected={"none"} />
        )}
        {/* The editDropdown component is a component retuns an ellipsis which upon click will give a drop down of two option whether to edit the board/task or to delete it  */}
        <BoardDropDown />
      </RightHalf>
    </Container>
  );
}
