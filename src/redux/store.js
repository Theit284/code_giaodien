import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authReducer";
import projectSlice from "./reducers/projectReducer";
import taskSlice from "./reducers/taskReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    task: taskSlice.reducer,
    project: projectSlice.reducer,
  },
});

export default store;
