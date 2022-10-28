import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/LocalStorage";

const PrivateRoute = () => {
  const token = getAccessToken();

  return token ? <Outlet /> : <Navigate to="/account/login" />;
};

export default PrivateRoute;
