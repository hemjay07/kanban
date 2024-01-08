import React, { useState } from "react";
import styled from "styled-components";
import ViewTask from "./veiwTask";
import EditTask from "./editTask";
import DeleteTask from "./deleteTask";
const TaskContainer = styled.div`
  // border: solid 2px red;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  background: var(--primary);
  box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
  border-radius: 0.5rem;
  h3 {
    font-size: 0.9375rem;
    font-weight: 700;
  }
  p {
    font-size: 0.75rem;
    color: var(--Medium-Grey, #828fa3);
  }
  &:hover {
    cursor: pointer;
    color: var(--Main-Purple);
  }
`;

export default function ({ taskData }) {
  // console.log(taskData.subtasks);
  // when the viewTask is set to true, a <ViewTask> modal is displayed showing the details of the task (subtask and all)
  // setIsViewTask sets the state and its important we pass it so that the overlay can use it to undisplay the modal

  const [viewTask, setViewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const totalSubtasks = Object.values(taskData.subtasks).length;
  const completedSubtasks = Object.values(taskData.subtasks).filter(
    (subtask) => subtask.isCompleted === true
  ).length;

  return (
    <>
      <TaskContainer onClick={() => setViewTask(true)}>
        <h3>{taskData.title}</h3>
        <p>
          {" "}
          {completedSubtasks} of {totalSubtasks} substacks
        </p>
      </TaskContainer>
      {viewTask && (
        <ViewTask
          taskData={taskData}
          setViewTask={setViewTask}
          setEditTask={setEditTask}
          setDeleteTask={setDeleteTask}
        />
      )}
      {editTask && (
        <EditTask
          taskData={taskData}
          setEdit={setEditTask}
          selected={taskData.status}
        />
      )}
      {deleteTask && (
        <DeleteTask taskData={taskData} setDeleteTask={setDeleteTask} />
      )}
    </>
  );
}
