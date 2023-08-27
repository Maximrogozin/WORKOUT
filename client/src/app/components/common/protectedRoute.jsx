import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { getIsRootAdmin, getIsRootManager } from "../../store/users";

const ProtectedRoute = ({ component: Component }) => {
  const rootAdmin = useSelector(getIsRootAdmin());
  const rootManager = useSelector(getIsRootManager());

  return rootManager || rootAdmin ? <Component /> : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
