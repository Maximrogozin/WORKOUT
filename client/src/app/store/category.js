import { createSlice } from "@reduxjs/toolkit";

import isOutdated from "../utils/isOutdated";
import categoryService from "../services/category.service";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    categoryRequested: (state) => {
      state.isLoading = true;
    },
    categoryRecieved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    categoryRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;
const { categoryRequested, categoryRecieved, categoryRequestFailed } = actions;

export const loadCategoryList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().category;
  if (isOutdated(lastFetch)) {
    dispatch(categoryRequested());
    try {
      const { content } = await categoryService.get();
      dispatch(categoryRecieved(content));
    } catch (error) {
      dispatch(categoryRequestFailed(error.message));
    }
  }
};

export const getCategoryList = () => (state) => state.category.entities;
export const getCategoryLoadingStatus = () => (state) =>
  state.category.isLoading;

export default categoryReducer;
