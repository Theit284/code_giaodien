import axios from "axios";
import { getAccessToken } from "../utils/LocalStorage";

const axiosConfig = axios.create({
  baseURL: "http://dev-api-timesheet.nccsoft.vn/api",
  headers: {
    "Context-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
