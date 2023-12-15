import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
const initialState = {
  PlatformLaunch: {
    name: "Platform Launch",
    columns: {
      Todo: {
        name: "Todo",
        tasks: [
          {
            title: "Build UI for onboarding flow",
            description: "",
            status: "Todo",
            subtasks: [
              {
                title: "Sign up page",
                isCompleted: true,
              },
              {
                title: "Sign in page",
                isCompleted: false,
              },
              {
                title: "Welcome page",
                isCompleted: false,
              },
            ],
          },
          {
            title: "Build UI for search",
            description: "",
            status: "Todo",
            subtasks: [
              {
                title: "Search page",
                isCompleted: false,
              },
            ],
          },
          {
            title: "Build settings UI",
            description: "",
            status: "Todo",
            subtasks: [
              {
                title: "Account page",
                isCompleted: false,
              },
              {
                title: "Billing page",
                isCompleted: false,
              },
            ],
          },
          {
            title: "QA and test all major user journeys",
            description:
              "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
            status: "Todo",
            subtasks: [
              {
                title: "Internal testing",
                isCompleted: false,
              },
              {
                title: "External testing",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      Doing: {
        name: "Doing",
        tasks: [
          {
            title: "Design settings and search pages",
            description: "",
            status: "Doing",
            subtasks: [
              {
                title: "Settings - Account page",
                isCompleted: true,
              },
              {
                title: "Settings - Billing page",
                isCompleted: true,
              },
              {
                title: "Search page",
                isCompleted: false,
              },
            ],
          },
          {
            title: "Add account management endpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                title: "Upgrade plan",
                isCompleted: true,
              },
              {
                title: "Cancel plan",
                isCompleted: true,
              },
              {
                title: "Update payment method",
                isCompleted: false,
              },
            ],
          },
          {
            title: "Design onboarding flow",
            description: "",
            status: "Doing",
            subtasks: [
              {
                title: "Sign up page",
                isCompleted: true,
              },
              {
                title: "Sign in page",
                isCompleted: false,
              },
              {
                title: "Welcome page",
                isCompleted: false,
              },
            ],
          },
          {
            title: "Add search enpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                title: "Add search endpoint",
                isCompleted: true,
              },
              {
                title: "Define search filters",
                isCompleted: false,
              },
            ],
          },
          {
            title: "Add authentication endpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                title: "Define user model",
                isCompleted: true,
              },
              {
                title: "Add auth endpoints",
                isCompleted: false,
              },
            ],
          },
          {
            title:
              "Research pricing points of various competitors and trial different business models",
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            status: "Doing",
            subtasks: [
              {
                title: "Research competitor pricing and business models",
                isCompleted: true,
              },
              {
                title: "Outline a business model that works for our solution",
                isCompleted: false,
              },
              {
                title:
                  "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      Done: {
        name: "Done",
        tasks: [
          {
            title: "Conduct 5 wireframe tests",
            description:
              "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
            status: "Done",
            subtasks: [
              {
                title: "Complete 5 wireframe prototype tests",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Create wireframe prototype",
            description:
              "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
            status: "Done",
            subtasks: [
              {
                title: "Create clickable wireframe prototype in Balsamiq",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Review results of usability tests and iterate",
            description:
              "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
            status: "Done",
            subtasks: [
              {
                title:
                  "Meet to review notes from previous tests and plan changes",
                isCompleted: true,
              },
              {
                title: "Make changes to paper prototypes",
                isCompleted: true,
              },
              {
                title: "Conduct 5 usability tests",
                isCompleted: true,
              },
            ],
          },
          {
            title:
              "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "",
            status: "Done",
            subtasks: [
              {
                title: "Create paper prototypes for version one",
                isCompleted: true,
              },
              {
                title: "Complete 10 usability tests",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Market discovery",
            description:
              "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
            status: "Done",
            subtasks: [
              {
                title: "Interview 10 prospective customers",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Competitor analysis",
            description: "",
            status: "Done",
            subtasks: [
              {
                title: "Find direct and indirect competitors",
                isCompleted: true,
              },
              {
                title: "SWOT analysis for each competitor",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Research the market",
            description:
              "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            subtasks: [
              {
                title: "Write up research analysis",
                isCompleted: true,
              },
              {
                title: "Calculate TAM",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Research the market",
            description:
              "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            subtasks: [
              {
                title: "Write up research analysis",
                isCompleted: true,
              },
              {
                title: "Calculate TAM",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Research the market",
            description:
              "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            subtasks: [
              {
                title: "Write up research analysis",
                isCompleted: true,
              },
              {
                title: "Calculate TAM",
                isCompleted: true,
              },
            ],
          },
          {
            title: "Research the market",
            description:
              "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            subtasks: [
              {
                title: "Write up research analysis",
                isCompleted: true,
              },
              {
                title: "Calculate TAM",
                isCompleted: true,
              },
            ],
          },
        ],
      },
    },
  },
};
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
        };
      },

      // This function is provided by createSlice and it helps prepare the payload, this allow for better debugging and lesser code in the reducer
      prepare(data) {
        const { boardName, ...columns } = data;

        // modify the column to this kind of data structure
        const modifiedColumns = Object.values(columns).map((column) => {
          return {
            name: column,
          };
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
    newTaskCreated: {
      reducer(state, action) {},
      prepare(data) {},
    },
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    taskEdited: {
      reducer(state, action) {},
      prepare(data) {},
    },
  },
});

export const selectBoards = (state) => state.boards;

export const { newBoardCreated, boardEdited, newTaskCreated, taskEdited } =
  boardSlice.actions;
export default boardSlice.reducer;
