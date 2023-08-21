import { createSlice } from "@reduxjs/toolkit";
import catalogService from "../services/catalog.service";

// const initialState = localStorageService.getAccessToken()
//   ? {
//       entities: null,
//       isLoading: true,
//       error: null,
//       auth: { userId: localStorageService.getUserId() },
//       isLoggedIn: true,
//       dataLoaded: false,
//     }
//   : {
//       entities: null,
//       isLoading: false,
//       error: null,
//       auth: null,
//       isLoggedIn: false,
//       dataLoaded: false,
//     };

const catalogsSlice = createSlice({
  name: "catalogs",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    catalogsRequested: (state) => {
      state.isLoading = true;
    },
    catalogsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    catalogsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    incrementProductCount: (state, action) => {
      const { payload: productId } = action;
      const product = state.entities.find((entity) => entity._id === productId);
      if (product) {
        product.count += 1;
      }
    },
    decrementProductCount: (state, action) => {
      const { payload: productId } = action;
      const product = state.entities.find((entity) => entity._id === productId);
      if (product.count > 1) {
        product.count -= 1;
      }
    },
    deleteProductCount: (state, action) => {
      const { payload: productId } = action;
      const product = state.entities.find((entity) => entity._id === productId);
      if (product) {
        product.count = 0;
      }
    },
  },
});

const { reducer: catalogsReducer, actions } = catalogsSlice;
const {
  catalogsRequested,
  catalogsReceived,
  catalogsRequestFailed,
  incrementProductCount,
  decrementProductCount,
  deleteProductCount,
} = actions;

export const loadCatalogsList = () => async (dispatch) => {
  dispatch(catalogsRequested());
  try {
    const { content } = await catalogService.get();
    dispatch(catalogsReceived(content));
  } catch (error) {
    dispatch(catalogsRequestFailed(error.message));
  }
};

export const incrementCount = (productId) => (dispatch) => {
  dispatch(incrementProductCount(productId));
};

export const decrementCount = (productId) => (dispatch) => {
  dispatch(decrementProductCount(productId));
};

export const deleteCount = (productId) => (dispatch) => {
  dispatch(deleteProductCount(productId));
};

export const getCatalogsList = () => (state) => state.catalogs.entities;

export const getCatalogsLoadingStatus = () => (state) =>
  state.catalogs.isLoading;

export const getCatalogsById = (productId) => (state) => {
  if (state.catalogs.entities) {
    return state.catalogs.entities.find((entity) => entity._id === productId);
  }
};

export const getBasket = () => (state) => {
  if (state.catalogs.entities) {
    const res = state.catalogs.entities.filter((entity) => entity.count !== 0);
    return res;
  }
};

export const getAllCount = (state) => {
  let result = 0;
  if (state.catalogs.entities) {
    state.catalogs.entities.forEach(({ count }) => {
      result += count;
    });
  }
  return result;
};

export const getTotalPrice = (state) => {
  let result = 0;
  if (state.catalogs.entities) {
    state.catalogs.entities.forEach(({ count, price }) => {
      result += count * price;
    });
  }
  return result;
};

export default catalogsReducer;
