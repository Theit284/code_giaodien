import { createSelector } from "@reduxjs/toolkit";
import { selectSelf } from "../reducers/taskReducer";

const allTaskSelector = createSelector(selectSelf, (state) => state.tasks);
export const commonTaskSelector = createSelector(allTaskSelector, (tasks) =>
  tasks.filter((task) => task.type === 0)
);
export const otherTaskSelector = createSelector(allTaskSelector, (tasks) =>
  tasks.filter((task) => task.type === 1)
);

export const errorSelector = createSelector(selectSelf, (state) => state.error);
export const successSelector = createSelector(
  selectSelf,
  (state) => state.success
);

export const progressSelector = createSelector(
  selectSelf,
  (state) => state.progress
);
