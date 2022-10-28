import axiosConfig from "./configapi";

export const getSingleProjectApi = async (input) => {
  try {
    let url = `/services/app/Project/Get?`;
    if (typeof input === "number") url += `input=${input}`;
    const res = await axiosConfig.get(url);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProjectApi = async ({ status, search }) => {
  try {
    let url = `/services/app/Project/GetAll?`;
    if (typeof status === "number") url += `status=${status}`;
    if (search) url += `&search=${search}`;
    const res = await axiosConfig.get(url);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createProjectApi = async ({
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
  try {
    const res = await axiosConfig.post(`/services/app/Project/Save`, {
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

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCustomerApi = async () => {
  try {
    const res = await axiosConfig.get(`/services/app/Customer/GetAll`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createCustomerApi = async ({ name, address, code, id }) => {
  try {
    const res = await axiosConfig.post(`/services/app/Customer/Save`, {
      name,
      address,
      code,
      id,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const activeProjectApi = async ({ id }) => {
  try {
    const res = await axiosConfig.post(
      `/services/app/Project/Active?Id=${id}`,
      { id }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const inactiveProjectApi = async ({ id }) => {
  try {
    const res = await axiosConfig.post(
      `/services/app/Project/Inactive?Id=${id}`,
      { id }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteProjectApi = async (id) => {
  try {
    const res = await axiosConfig.delete(
      `/services/app/Project/Delete?Id=${id}`
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserNotPaggingApi = async () => {
  try {
    const res = await axiosConfig.get(`/services/app/User/GetUserNotPagging`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
