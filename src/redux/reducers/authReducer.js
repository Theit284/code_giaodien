import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../../utils/LocalStorage";
import { getAuthenticate } from "../actions/authAction";

const initialState = {
  progress: "",
  user: {
    accessToken: "",
  },
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetProgress: (state) => {
      state.progress = "";
    },
    removeToken: (state) => {
      state.user.accessToken = "";
    },
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthenticate.fulfilled, (state, action) => {
        console.log(action.payload);
        state.progress = "done";
        if (action.payload.success === true) {
          setAccessToken(action.payload.result.accessToken);
          state.success = true;
          state.user.accessToken = action.payload.result.accessToken;
        } else {
          state.error = action.payload.error.message;
        }
      })
      .addCase(getAuthenticate.pending, (state, action) => {
        state.progress = "pending";
      });
  },
});

export const { removeToken, resetError, resetSuccess } = authSlice.actions;

export default authSlice;
