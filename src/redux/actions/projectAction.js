import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  activeProjectApi,
  createCustomerApi,
  createProjectApi,
  deleteProjectApi,
  getCustomerApi,
  getProjectApi,
  getSingleProjectApi,
  getUserNotPaggingApi,
  inactiveProjectApi,
} from "../../api/projectApi";

export const getProject = createAsyncThunk(
  `/services/app/Project/GetAll`,
  async ({ status, search }) => {
    const res = await getProjectApi({ status, search });
    return res;
  }
);

export const getSingleProject = createAsyncThunk(
  `/services/app/Project/GetSingle`,
  async (input) => {
    const res = await getSingleProjectApi(input);
    return res;
  }
);

export const createProject = createAsyncThunk(
  `/services/app/Project/Save`,
  async ({
    id,
    name,
    code,
    status,
    timeStart,
    timeEnd,
    note,
    projectType,
    customerId,
    tasks,
    users,
    projectTargetUsers,
    isAllUserBelongTo,
  }) => {
    const res = await createProjectApi({
      id,
      name,
      code,
      status,
      timeStart,
      timeEnd,
      note,
      projectType,
      customerId,
      tasks,
      users,
      projectTargetUsers,
      isAllUserBelongTo,
    });
    return res;
  }
);

export const getCustomer = createAsyncThunk(
  `/services/app/Customer/GetAll`,
  async () => {
    const res = await getCustomerApi();
    return res;
  }
);

export const createCustomer = createAsyncThunk(
  `/services/app/Customer/Save`,
  async ({ name, address, code, id }) => {
    const res = await createCustomerApi({ name, address, code, id });
    return res;
  }
);

export const activeProject = createAsyncThunk(
  `/services/app/Project/Active`,
  async ({ id }) => {
    const res = { ...(await activeProjectApi({ id })), id };
    return res;
  }
);

export const inactiveProject = createAsyncThunk(
  `/services/app/Project/Inactive`,
  async ({ id }) => {
    const res = { ...(await inactiveProjectApi({ id })), id };
    return res;
  }
);

export const deleteProject = createAsyncThunk(
  `/services/app/Project/Delete`,
  async (id) => {
    const res = { ...(await deleteProjectApi(id)), id };
    return res;
  }
);

export const getUserNotPagging = createAsyncThunk(
  `/services/app/User/GetUserNotPagging`,
  async () => {
    const res = await getUserNotPaggingApi();
    return res;
  }
);
