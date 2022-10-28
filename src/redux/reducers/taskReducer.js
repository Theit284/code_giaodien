import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  archiveTask,
  createTask,
  deArchiveTask,
  deleteTask,
  getTask,
} from "../actions/taskAction";

const initialState = {
  tasks: [],
  progress: "",
  success: "",
  error: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    resetSuccess: (state) => {
      state.success = "";
    },
    resetProgress: (state) => {
      state.progress = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.progress = "done";
      state.tasks = action.payload.result;
    });

    builder
      .addCase(createTask.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.result.id
          );
          if (index > -1) {
            state.success = `Edit success ${action.payload.result.name}`;
            state.tasks[index] = action.payload.result;
            //
          } else {
            state.success = `Create success ${action.payload.result.name}`;
            state.tasks.push(action.payload.result);
          }
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(deleteTask.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.progress = "done";
        state.success = `Delete success`;
        if (action.payload.success === true) {
          state.tasks = state.tasks.filter((task) => {
            return task.id !== action.payload.id;
          });
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(archiveTask.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(archiveTask.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          state.success = `Archive success`;
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          state.tasks[index].isDeleted = true;
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(deArchiveTask.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(deArchiveTask.fulfilled, (state, action) => {
        state.progress = "done";
        state.success = `DeArchive success`;
        if (action.payload.success === true) {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          state.tasks[index].isDeleted = false;
        } else {
          state.error = action.payload.error.message;
        }
      });
  },
});

export const { resetError, resetProgress, resetSuccess } = taskSlice.actions;
export const selectSelf = (state) => state.task;

export default taskSlice;
