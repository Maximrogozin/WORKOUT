import { createSlice } from "@reduxjs/toolkit";

const catalogsSlice = createSlice({
  name: "catalogs",
  initialState: {
    entities: null,
    isLoading: true,
  },
});

const { reducer: catalogsReducer } = catalogsSlice;

export default catalogsReducer;
