import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Users from "../page/Users";

import { getIsRootAdmin } from "../../store/users";

const ProtectedRouteAdmin = () => {
  const rootAdmin = useSelector(getIsRootAdmin());

  return rootAdmin ? <Users /> : <Navigate to="/" />;
};

export default ProtectedRouteAdmin;
