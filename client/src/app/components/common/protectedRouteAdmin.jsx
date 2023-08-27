import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { getIsRootAdmin } from "../../store/users";

const ProtectedRouteAdmin = ({ component: Component }) => {
  const rootAdmin = useSelector(getIsRootAdmin());

  return rootAdmin ? <Component /> : <Navigate to="/" />;
};

ProtectedRouteAdmin.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRouteAdmin;
