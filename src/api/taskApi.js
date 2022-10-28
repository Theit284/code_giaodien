import axiosConfig from "./configapi.js";

export const getTaskApi = async () => {
  try {
    const res = await axiosConfig.get(`/services/app/Task/GetAll`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createTaskApi = async ({ id, name, type }) => {
  try {
    const create = await axiosConfig.post(`/services/app/Task/Save`, {
      id,
      name,
      type,
    });
    return create.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTaskApi = async (id) => {
  try {
    const res = await axiosConfig.delete(`/services/app/Task/Delete?Id=${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const archiveTaskApi = async (id) => {
  try {
    const res = await axiosConfig.delete(`/services/app/Task/Archive?Id=${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deArchiveTaskApi = async ({ id }) => {
  try {
    const res = await axiosConfig.post(
      `/services/app/Task/DeArchive?Id=${id}`,
      {
        id,
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
