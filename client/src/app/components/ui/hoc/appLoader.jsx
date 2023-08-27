/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCatalogsLoadingStatus,
  loadCatalogsList,
} from "../../../store/catalog";
import {
  getCategoryLoadingStatus,
  loadCategoryList,
} from "../../../store/category";
import Loader from "../Loader";
import { createArrayInLocalStorage } from "../../../utils/basket.localStorage";
import { loadUsersList } from "../../../store/users";
import { loadOrdersList } from "../../../store/orders";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const catalogStatusLoading = useSelector(getCatalogsLoadingStatus());
  const categoryLoadingStatus = useSelector(getCategoryLoadingStatus());
  useEffect(() => {
    dispatch(loadCatalogsList());
    dispatch(loadCategoryList());
    dispatch(loadUsersList());
    dispatch(loadOrdersList());
    createArrayInLocalStorage();
  }, []);
  if (catalogStatusLoading || categoryLoadingStatus) return <Loader />;
  return children;
};
export default AppLoader;
