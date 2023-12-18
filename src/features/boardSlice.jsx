import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
const initialState = {};
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    newBoardCreated: {
      reducer(state, action) {
        const { boardName, modifiedColumns, modifiedBoardName } =
          action.payload;

        // Create the columns to that particular board
        state[modifiedBoardName] = {
          name: boardName,
          columns: modifiedColumns,
          tasks: {},
        };
      },

      // This function is provided by createSlice and it helps prepare the payload, this allow for better debugging and lesser code in the reducer
      prepare(data) {
        const { boardName, ...columns } = data;

        let modifiedColumns = {};
        // modify the column to this kind of data structure
        Object.values(columns).forEach((column) => {
          modifiedColumns[column] = { name: column, tasks: {} };
        });

        // convert the name of the board to a single string since that is how its object will be named (this is different from what its name is IN the object itself)
        const modifiedBoardName = boardName.replace(/\s+/g, "");

        return {
          payload: { boardName, modifiedColumns, modifiedBoardName },
        };
      },
    },

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    boardEdited: {
      reducer(state, action) {
        const {
          modifiedColumns,
          modifiedBoardName,
          currentBoardName,
          boardName,
        } = action.payload;
        //  state[modifiedBoardName] =
        // check if the new columns already exist in the state, if so you want to maintain the columns ( so you dont overwrite the task and other data in them), if the column is however new, just add it to the columns object directly
        const formerColumn = state[currentBoardName].columns;
        const formerColumnsKeys = Object.keys(state[currentBoardName].columns);

        // newColumn is used to mutate  columns object in the state
        let newColumn = {};

        Object.entries(modifiedColumns).forEach(([key, value]) => {
          // if this particular column exists in statte already, create a column using the column that is in the state
          if (formerColumnsKeys.includes(key)) {
            newColumn[key] = formerColumn[key];
          } else {
            // else use the value that is in the modifiedColumns which is of course new
            newColumn[key] = value;
          }
        });

        state[currentBoardName].columns = newColumn;

        // If the name of the board is changed, you want to change the key that is used to identify this board in the state and also the board.name
        if (modifiedBoardName !== currentBoardName) {
          // make a copy of the board into a new board that has its key as the updated name
          state[modifiedBoardName] = state[currentBoardName];
          state[modifiedBoardName].name = boardName;

          // then delete the stale board
          delete state[currentBoardName];
        }
      },

      prepare(data) {
        const { boardName, ...columns } = data.data;
        // currentBoard is important. This is because the user could have changed the name of the board and this is the only way to take note of that
        const currentBoardName = data.currentBoard.replace(/\s+/g, "");

        // Merge the boardName in case there is a space, an object key cannot be 2 stings
        const modifiedBoardName = boardName.replace(/\s+/g, "");

        // convert the data from {1: "Todo", 2: "Doing", 3 "Done"} to Todo={name:"Todo"} as this is how the column is situated in the state

        let modifiedColumns = {};
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
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    boardDeleted: {
      reducer(state, action) {
        const currentBoard = action.payload;
        delete state[currentBoard];
      },
    },
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        const taskId = nanoid();
        const currentBoardName = data.currentBoard.replace(/\s+/g, "");

        let subtasksObject = {};
        Object.values(subtasks).forEach((subtask) => {
          const subtaskId = nanoid();
          subtasksObject[subtaskId] = {
            title: subtask,
            isCompleted: false,
            subtaskId: subtaskId,
          };
          // subtasksArray.push({ title: subtask, isCompleted: false });
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
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
          let previousCheckedState;
          if (previousSubtasksObject[subtaskId]) {
            previousCheckedState =
              previousSubtasksObject[subtaskId].isCompleted;
          } else {
            previousCheckedState = false;
          }

          modifiedSubtasksObject[subtaskId] = {
            title: subtask,
            subtaskId: subtaskId,
            isCompleted: previousCheckedState,
          };
        });

        // now set the entire task
        state[currentBoardName].tasks[taskId] = {
          title,
          description,
          subtasks: modifiedSubtasksObject,
          taskId,
          status,
        };
      },
      prepare(data) {
        const {
          title,
          description,
          status,

          ...subtasks
        } = data.data;
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
    }, // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    taskDeleted: {
      reducer(state, action) {
        const { taskId, currentBoard } = action.payload;
        delete state[currentBoard].tasks[taskId];
      },
    },
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    statusChanged: {
      reducer(state, action) {
        const { taskId, newStatus, currentBoard } = action.payload;
        state[currentBoard].tasks[taskId].status = newStatus;
      },
    },
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    checkButtonChanged: {
      reducer(state, action) {
        const { data, currentBoard, taskId } = action.payload;

        Object.entries(data).forEach(([key, value]) => {
          state[currentBoard].tasks[taskId].subtasks[key].isCompleted =
            value.isCompleted;
        });
      },
    },
  },
});

export const selectBoards = (state) => state.boards;

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
export default boardSlice.reducer;
