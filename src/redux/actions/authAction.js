import { createAsyncThunk } from "@reduxjs/toolkit";
import getAuthenticateApi from "../../api/auth";

export const getAuthenticate = createAsyncThunk(
  "TokenAuth/Authenticate",
  async ({ userNameOrEmailAddress, password, rememberClient }) => {
    const response = await getAuthenticateApi({
      userNameOrEmailAddress,
      password,
      rememberClient,
    });
    return response;
  }
);
