import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./modal";
import TaskDropDown from "./taskDropDown";
import { SelectorInput } from "./inputs";
import { useDispatch } from "react-redux";
import { statusChanged } from "../features/boardSlice";
import { selectSelectedBoard } from "../features/selectors";
const ViewTaskContainer = styled.div`
  // border: solid 2px red;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: absolute;
  width: 95vw;
  max-width: 30rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  z-index: 2;
  background: var(--primary);
  padding: 2rem;
  border-radius: 5px;
`;
const TaskTitle = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  color: var(--text-color);
  font-size: 1.125rem;
  font-weight: 700;
`;
const TaskDescripiton = styled.p`
  color: var(--Medium-Grey, #828fa3);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem; /* 176.923% */
`;
const SubtaskHeader = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
`;
const Subtasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Subtask = styled.div`
  padding: 0.7rem 0.81rem;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  background: var(--background);
  label {
    display: flex;
    gap: 0.5rem;
  }

  p {
    opacity: 0.5;
  }
`;
const StatusHeader = SubtaskHeader;

export default function ViewTask({
  setViewTask,
  setEditTask,
  setDeleteTask,
  taskData,
}) {
  // Status change logic
  const dispatch = useDispatch();
  const currentBoard = selectSelectedBoard();
  function handleStatusChange(e) {
    e.preventDefault();
    const newStatus = e.target.value;

    const taskId = taskData.taskId;
    dispatch(statusChanged({ newStatus, taskId, currentBoard }));
  }

  const [isCompleted, setIsCompleted] = useState(false);
  function handleCompletedChange() {
    setIsCompleted((prev) => !prev);
  }

  return (
    <div>
      <Modal visibilitySetter={setViewTask} />
      <ViewTaskContainer>
        <TaskTitle>
          {/* The editDropdown component is a component that retuns an ellipsis which upon click will give a drop down of two option whether to edit the board/task or to delete it  */}

          <p>{taskData.title}</p>
          {/* the edit type is used to tell the component where the drop down is located, if it is located in the navbar, the edit type will be Board and if it is located in the ViewTask modal, the edit type should be Task */}
          <TaskDropDown
            setViewTask={setViewTask}
            setEditTask={setEditTask}
            setDeleteTask={setDeleteTask}
          />
        </TaskTitle>
        <TaskDescripiton>{taskData.description}</TaskDescripiton>
        <SubtaskHeader>
          Substacks ({taskData.subtasks.length} of 3 )
        </SubtaskHeader>
        <Subtasks>
          {Object.values(taskData.subtasks).map((subtask, index) => {
            return (
              <Subtask key={index}>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleCompletedChange}
                    // checked={subtask.isCompleted}
                    checked={isCompleted}
                  />
                  <p
                    style={{
                      textDecorationLine: `${
                        isCompleted ? "line-through" : "none"
                      }`,
                      opacity: `${isCompleted ? 0.5 : 1}`,
                    }}
                  >
                    {subtask.title}
                  </p>
                </label>
              </Subtask>
            );
          })}
        </Subtasks>
        <StatusHeader> Current Status</StatusHeader>
        <SelectorInput
          selected={taskData.status}
          statusChange={handleStatusChange}
        />
      </ViewTaskContainer>
    </div>
  );
}
