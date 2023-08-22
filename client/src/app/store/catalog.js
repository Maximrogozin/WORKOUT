import { createAction, createSlice } from "@reduxjs/toolkit";
import catalogService from "../services/catalog.service";
import localStorageService from "../services/localStorage.service";
import { generetaAuthError } from "../utils/generateAuthError";
import {
  getDataFromLocalStorage,
  mergeCounts,
} from "../utils/basket.localStorage";
import authService from "../services/auth.service";
import { sortByProductId } from "../utils/sort";
const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const catalogsSlice = createSlice({
  name: "catalogs",
  initialState,
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
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
    catalogsCreated: (state, action) => {
      state.entities.push(action.payload);
    },

    catalogsUpdate: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
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
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  catalogsUpdate,
} = actions;

const authRequested = createAction("catalogs/authRequested");
const catalogsUpdateFailed = createAction("catalogs/catalogsUpdateFailed");
const catalogUpdateRequested = createAction("catalogs/catalogUpdateRequested");

export const login =
  ({ payload }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const register = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const loadCatalogsList = () => async (dispatch) => {
  dispatch(catalogsRequested());
  try {
    const { content } = await catalogService.get();
    const localContent = getDataFromLocalStorage();
    dispatch(
      catalogsReceived(sortByProductId(mergeCounts(content, localContent)))
    );
  } catch (error) {
    dispatch(catalogsRequestFailed(error.message));
  }
};

export const updateCatalog = (payload, productId) => async (dispatch) => {
  dispatch(catalogUpdateRequested());
  try {
    const { content } = await catalogService.update(payload, productId);
    dispatch(catalogsUpdate(content));
  } catch (error) {
    dispatch(catalogsUpdateFailed(error.message));
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

export const getAuthErrors = () => (state) => state.catalogs.error;
export const getIsLoggedIn = () => (state) => state.catalogs.isLoggedIn;

export default catalogsReducer;
