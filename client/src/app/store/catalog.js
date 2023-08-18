import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
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
      state.dataLoaded = true;
      state.isLoading = false;
    },
  },
});

const { reducer: catalogsReducer } = catalogsSlice;

export default catalogsReducer;
