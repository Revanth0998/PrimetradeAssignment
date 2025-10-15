import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  return jwtToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
