import catalogsReducer from "./catalog";
import categoryReducer from "./category";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  catalog: catalogsReducer,
  category: categoryReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
