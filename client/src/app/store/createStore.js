import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogsReducer from "./catalog";

const rootReducer = combineReducers({ catalogs: catalogsReducer });

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
