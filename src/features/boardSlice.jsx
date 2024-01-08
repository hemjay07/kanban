import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import intitialState from "./initialState";

// Define the initial state of the board
const initialState = intitialState.boards;

// Create a slice for board state management with Redux Toolkit
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // Reducer to handle new board creation
    newBoardCreated: {
      reducer(state, action) {
        const { boardName, modifiedColumns, modifiedBoardName } =
          action.payload;

        // Set the new board structure with its name, columns, and tasks
        state[modifiedBoardName] = {
          name: boardName,
          columns: modifiedColumns,
          tasks: {},
        };
      },
      prepare(data) {
        const { boardName, ...columns } = data;

        let modifiedColumns = {};
        // Alter columns structure to fit the desired state shape
        Object.values(columns).forEach((column) => {
          modifiedColumns[column] = { name: column, tasks: {} };
        });

        // Ensure board name is a single string to be used as an object key
        const modifiedBoardName = boardName.replace(/\s+/g, "");

        return {
          payload: { boardName, modifiedColumns, modifiedBoardName },
        };
      },
    },

    // Reducer to handle board edits
    boardEdited: {
      reducer(state, action) {
        const {
          modifiedColumns,
          modifiedBoardName,
          currentBoardName,
          boardName,
        } = action.payload;

        const formerColumn = state[currentBoardName].columns;
        const formerColumnsKeys = Object.keys(state[currentBoardName].columns);

        // Prepare the new columns object based on current or new column data
        let newColumn = {};

        Object.entries(modifiedColumns).forEach(([key, value]) => {
          if (formerColumnsKeys.includes(key)) {
            newColumn[key] = formerColumn[key]; // Maintain existing column data
          } else {
            newColumn[key] = value; // Add new column
          }
        });

        // Update the columns for the given board
        state[currentBoardName].columns = newColumn;

        // Check if the board name has changed and update if necessary
        if (modifiedBoardName !== currentBoardName) {
          state[modifiedBoardName] = state[currentBoardName]; // Duplicate board with new name
          state[modifiedBoardName].name = boardName; // Update board name
          delete state[currentBoardName]; // Remove old board
        }
      },
      prepare(data) {
        const { boardName, ...columns } = data.data;
        const currentBoardName = data.currentBoard.replace(/\s+/g, "");
        const modifiedBoardName = boardName.replace(/\s+/g, "");

        let modifiedColumns = {};
        // Adjust the columns' structure to fit the state shape
        Object.values(columns).forEach((column) => {
          modifiedColumns[column] = { name: column };
        });

        return {
          payload: {
            modifiedColumns,
            modifiedBoardName,
            currentBoardName,
            boardName,
          },
        };
      },
    },

    // Reducer to handle board deletion
    boardDeleted: {
      reducer(state, action) {
        const currentBoard = action.payload;
        delete state[currentBoard]; // Remove the specified board
      },
    },

    // Reducer to handle new task creation
    newTaskCreated: {
      reducer(state, action) {
        const {
          title,
          description,
          subtasksObject,
          status,
          taskId,
          currentBoardName,
        } = action.payload;
        state[currentBoardName].tasks[taskId] = {
          title,
          description,
          subtasks: subtasksObject,
          taskId,
          status,
        };
      },
      prepare(data) {
        const { title, description, status, ...subtasks } = data.data;
        const taskId = nanoid(); // Generate a unique ID for the new task
        const currentBoardName = data.currentBoard.replace(/\s+/g, "");

        let subtasksObject = {};
        Object.values(subtasks).forEach((subtask) => {
          const subtaskId = nanoid(); // Generate unique ID for subtasks
          subtasksObject[subtaskId] = {
            title: subtask,
            isCompleted: false,
            subtaskId: subtaskId,
          };
        });

        return {
          payload: {
            title,
            description,
            subtasksObject,
            status,
            taskId,
            currentBoardName,
          },
        };
      },
    },

    // Reducer to handle task edits
    taskEdited: {
      reducer(state, action) {
        const {
          title,
          description,
          status,
          taskId,
          currentBoardName,
          subtasksObject,
          previousSubtasksObject,
        } = action.payload;

        let modifiedSubtasksObject = {};
        Object.entries(subtasksObject).forEach(([subtaskId, subtask]) => {
          let previousCheckedState = previousSubtasksObject[subtaskId]
            ? previousSubtasksObject[subtaskId].isCompleted
            : false;

          modifiedSubtasksObject[subtaskId] = {
            title: subtask,
            subtaskId: subtaskId,
            isCompleted: previousCheckedState,
          };
        });

        // Update the entire task data in the state
        state[currentBoardName].tasks[taskId] = {
          title,
          description,
          subtasks: modifiedSubtasksObject,
          taskId,
          status,
        };
      },
      prepare(data) {
        const { title, description, status, ...subtasks } = data.data;
        const taskId = data.taskId;
        const currentBoardName = data.currentBoardName;
        const previousSubtasksObject = data.previousSubtasksObject;

        return {
          payload: {
            title,
            description,
            status,
            taskId,
            currentBoardName,
            subtasksObject: subtasks,
            previousSubtasksObject,
          },
        };
      },
    },

    // Reducer to handle task deletion
    taskDeleted: {
      reducer(state, action) {
        const { taskId, currentBoard } = action.payload;
        delete state[currentBoard].tasks[taskId]; // Remove the specified task
      },
    },

    // Reducer to handle status changes of tasks
    statusChanged: {
      reducer(state, action) {
        const { taskId, newStatus, currentBoard } = action.payload;
        state[currentBoard].tasks[taskId].status = newStatus; // Update task status
      },
    },

    // Reducer to handle check button state changes within tasks
    checkButtonChanged: {
      reducer(state, action) {
        const { data, currentBoard, taskId } = action.payload;

        // Update the completion state of each subtask
        Object.entries(data).forEach(([key, value]) => {
          state[currentBoard].tasks[taskId].subtasks[key].isCompleted =
            value.isCompleted;
        });
      },
    },
  },
});

// Selector function to access the boards state
export const selectBoards = (state) => state.boards;

// Export the actions generated by createSlice
export const {
  newBoardCreated,
  boardEdited,
  newTaskCreated,
  taskEdited,
  statusChanged,
  checkButtonChanged,
  boardDeleted,
  taskDeleted,
} = boardSlice.actions;

// Export the reducer function for the boardSlice
export default boardSlice.reducer;
