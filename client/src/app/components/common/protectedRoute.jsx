import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsRootAdmin, getIsRootManager } from "../../store/users";

const ProtectedRoute = ({ component: Component }) => {
  const rootAdmin = useSelector(getIsRootAdmin());
  const rootManager = useSelector(getIsRootManager());

  console.log("rootManager", rootManager);
  console.log("rootAdmin", rootAdmin);

  return rootManager || rootAdmin ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
