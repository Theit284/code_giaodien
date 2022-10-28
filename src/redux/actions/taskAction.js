import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  archiveTaskApi,
  createTaskApi,
  deArchiveTaskApi,
  deleteTaskApi,
  getTaskApi,
} from "../../api/taskApi";

export const getTask = createAsyncThunk(
  `/services/app/Task/GetAll`,
  async () => {
    const res = await getTaskApi();
    return res;
  }
);

export const createTask = createAsyncThunk(
  `/services/app/Task/Save`,
  async ({ id, name, type }) => {
    const res = await createTaskApi({ id, name, type });
    return res;
  }
);

export const deleteTask = createAsyncThunk(
  `/services/app/Task/Delete`,
  async (id) => {
    const res = { ...(await deleteTaskApi(id)), id };
    return res;
  }
);

export const archiveTask = createAsyncThunk(
  `/services/app/Task/Archive`,
  async (id) => {
    const res = { ...(await archiveTaskApi(id)), id };
    return res;
  }
);

export const deArchiveTask = createAsyncThunk(
  `/services/app/Task/DeArchive`,
  async ({ id }) => {
    const res = { ...(await deArchiveTaskApi({ id })), id };
    return res;
  }
);
