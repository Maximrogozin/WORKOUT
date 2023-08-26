import catalogsReducer from "./catalog";
import categoryReducer from "./category";
import usersReducer from "./users";
import ordersReducer from "./orders";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  catalogs: catalogsReducer,
  category: categoryReducer,
  users: usersReducer,
  orders: ordersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
