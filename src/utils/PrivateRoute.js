import React from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth ? children : <Navigate to="/auth" />
}

export default PrivateRoute;