import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  activeProject,
  createCustomer,
  createProject,
  deleteProject,
  getCustomer,
  getProject,
  getSingleProject,
  getUserNotPagging,
  inactiveProject,
} from "../actions/projectAction";
import { getTask } from "../actions/taskAction";

const initialState = {
  singleProject: {},
  projects: [],
  customers: [],
  users: [],
  tasks: [],
  selectedUsers: [],
  unSelectedUsers: [],
  allTasks: [],
  selectedTasks: [],
  unSelectedTasks: [],
  progress: "",
  error: "",
  success: "",
};

const projectSlice = createSlice({
  name: "project",
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
    resetInfo: (state) => {
      state.singleProject = {};
    },
    pushTask: (state, action) => {
      state.selectedTasks.push(action.payload);

      state.tasks.push({ taskId: action.payload.id, billable: true });

      state.unSelectedTasks = state.unSelectedTasks.filter(
        (project) => project.id !== action.payload.id
      );
    },

    removeTask: (state, action) => {
      state.selectedTasks = state.selectedTasks.filter(
        (project) => project.id !== action.payload.id
      );
      state.unSelectedTasks.push(action.payload);

      state.tasks = state.tasks.filter(
        (project) => project.taskId !== action.payload.id
      );
    },

    pushUser: (state, action) => {
      state.selectedUsers.push(action.payload);
      state.unSelectedUsers = state.unSelectedUsers.filter(
        (user) => user.id !== action.payload.id
      );
      state.users.push({
        userId: action.payload.id,
        type: 0,
        isTemp: false,
      });
    },

    removeUser: (state, action) => {
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== action.payload.id
      );
      state.unSelectedUsers.push(action.payload);

      state.users = state.users.filter(
        (user) => user.userId !== action.payload.id
      );
    },

    updateBillable: (state, action) => {
      state.tasks = state.tasks.map((project) => {
        if (project.taskId === action.payload.id) {
          project.billable = !project.billable;
        }
        return project;
      });
      state.selectedTasks = state.selectedTasks.map((task) => {
        if (task.id === action.payload.id) {
          task.billable = !task.billable;
        }
        return task;
      });
    },

    updateType: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.userId === action.payload.id) {
          user.type = action.payload.role;
        }
        return user;
      });
      state.selectedUsers = state.selectedUsers.map((user) => {
        if (user.id === action.payload.id) {
          user.role = action.payload.role;
        }
        return user;
      });
    },

    addData: (state) => {
      state.selectedTasks = state.allTasks
        .filter((selectedTask) =>
          state.tasks.some((project) => project.taskId === selectedTask.id)
        )
        .map((selectedTask) => {
          const index = state.tasks.findIndex(
            (task) => task.taskId === selectedTask.id
          );
          return {
            ...selectedTask,
            billable: state.tasks[index].billable,
          };
        });

      state.unSelectedTasks = state.allTasks.filter(
        (selectedTask) =>
          !state.tasks.some((project) => project.taskId === selectedTask.id)
      );

      state.selectedUsers = state.unSelectedUsers
        .filter((selectedUser) =>
          state.users.some((user) => user.userId === selectedUser.id)
        )
        .map((selectedUser) => {
          const index = state.users.findIndex(
            (user) => user.userId === selectedUser.id
          );
          return {
            ...selectedUser,
            role: state.users[index].type,
          };
        });

      state.unSelectedUsers = state.unSelectedUsers.filter(
        (selectedUser) =>
          !state.users.some((user) => user.userId === selectedUser.id)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.progress = "done";
        state.projects = action.payload.result;
      });

    builder
      .addCase(getSingleProject.pending, (state) => {
        state.progress = "pending";
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.progress = "done";
        state.singleProject = action.payload.result;
        state.tasks = action.payload.result.tasks;
        state.users = action.payload.result.users;
      });

    builder
      .addCase(createProject.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          const res = {
            customerName: state.customers.find(
              (customer) => customer.id === action.payload.result.customerId
            ).name,
            name: action.payload.result.name,
            code: action.payload.result.code,
            status: action.payload.result.status,
            pms: state.selectedUsers
              .filter((user) =>
                action.payload.result.users.some(
                  (e) => e.userId === user.id && e.type === 1
                )
              )
              .map((user) => user.name),
            activeMember: action.payload.result.users.filter(
              (user) => user.type !== 3
            ).length,
            projectType: action.payload.result.projectType,
            timeStart: action.payload.result.timeStart,
            timeEnd: action.payload.result.timeStart,
          };

          const index = state.projects.findIndex(
            (project) => project.id === action.payload.result.id
          );
          if (index > -1) {
            state.success = `Edit Project Success`;
            state.projects[index] = res;
          } else {
            state.success = `Create Project Success`;
            state.projects.push(res);
          }
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(getCustomer.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.progress = "done";
        state.customers = action.payload.result;
      });

    builder
      .addCase(createCustomer.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          state.success = "Create success";
          state.customers.push(action.payload.result);
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(getUserNotPagging.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getUserNotPagging.fulfilled, (state, action) => {
        state.progress = "done";
        state.selectedUsers = [];
        state.unSelectedUsers = action.payload.result.map((user) => ({
          ...user,
          role: 0,
        }));
      });

    builder
      .addCase(getTask.pending, (state, action) => {
        state.progress = "pending";
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.progress = "done";
        state.allTasks = action.payload.result.map((task) => ({
          ...task,
          billable: true,
        }));
        state.selectedTasks = state.allTasks.filter(
          (project) => project.type === 0
        );
        state.unSelectedTasks = state.allTasks.filter(
          (project) => project.type === 1
        );
        state.tasks = state.selectedTasks.map((project) => ({
          taskId: project.id,
          billable: true,
        }));
      });

    ////////////////////////
    builder
      .addCase(activeProject.pending, (state) => {
        state.progress = "pending";
      })
      .addCase(activeProject.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          state.success = `Active Project Success`;
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          state.projects[index].status = 0;
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(inactiveProject.pending, (state) => {
        state.progress = "pending";
      })
      .addCase(inactiveProject.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          state.success = `Inactive Project Success`;
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          state.projects[index].status = 1;
        } else {
          state.error = action.payload.error.message;
        }
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.progress = "pending";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.progress = "done";
        if (action.payload.success === true) {
          state.success = `Delete Project Success`;
          state.projects = state.projects.filter((project) => {
            return project.id !== action.payload.id;
          });
        } else {
          state.error = action.payload.error.message;
        }
      });
  },
});

export const selectSelf = (state) => state.project;

export const {
  removeTask,
  pushTask,
  removeUser,
  pushUser,
  updateBillable,
  updateType,
  resetError,
  resetProgress,
  resetSuccess,
  resetInfo,
  addData,
} = projectSlice.actions;

export default projectSlice;
