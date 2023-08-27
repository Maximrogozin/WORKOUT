import React from "react";
import { useSelector } from "react-redux";

import { getIsRootAdmin, getIsRootManager } from "../../store/users";
import ProductDescriptionEditPage from "../page/productDescriptionEditPage";
import ProductDescriptionPage from "../page/productDescriptionPage";

const ProtectedRouteEditPage = () => {
  const rootAdmin = useSelector(getIsRootAdmin());
  const rootManager = useSelector(getIsRootManager());

  return rootManager || rootAdmin ? (
    <ProductDescriptionPage />
  ) : (
    <ProductDescriptionEditPage />
  );
};

export default ProtectedRouteEditPage;
