import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Orders from "../page/Orders";

import { getIsRootAdmin, getIsRootManager } from "../../store/users";

const ProtectedRoute = () => {
  const rootAdmin = useSelector(getIsRootAdmin());
  const rootManager = useSelector(getIsRootManager());

  return rootManager || rootAdmin ? <Orders /> : <Navigate to="/" />;
};

export default ProtectedRoute;
