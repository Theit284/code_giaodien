import { createSelector } from "@reduxjs/toolkit";
import { selectSelf } from "../reducers/projectReducer";

export const customerSelector = createSelector(
  selectSelf,
  (state) => state.customers
);
export const taskSelector = createSelector(selectSelf, (state) => state.tasks);
export const selectedTaskSelector = createSelector(
  selectSelf,
  (state) => state.selectedTasks
);
export const unSelectedTaskSelector = createSelector(
  selectSelf,
  (state) => state.unSelectedTasks
);

export const userSelector = createSelector(selectSelf, (state) => state.users);
export const unselectedUserSelector = createSelector(
  selectSelf,
  (state) => state.unSelectedUsers
);
export const selectedUserSelector = createSelector(
  selectSelf,
  (state) => state.selectedUsers
);

export const projectSelector = createSelector(
  selectSelf,
  (state) => state.projects
);
export const singleProjectSelector = createSelector(
  selectSelf,
  (state) => state.singleProject
);

export const successSelector = createSelector(
  selectSelf,
  (state) => state.success
);
export const errorSelector = createSelector(selectSelf, (state) => state.error);
export const progressSelector = createSelector(
  selectSelf,
  (state) => state.progress
);
