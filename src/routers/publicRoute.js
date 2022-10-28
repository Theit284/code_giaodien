import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/LocalStorage";

const PublicRoute = () => {
  const token = getAccessToken();

  return !token ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;
