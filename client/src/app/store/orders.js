import ordersService from "../services/orders.service";

const { createSlice, createAction } = require("@reduxjs/toolkit");

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    orderRequested: (state) => {
      state.isLoading = true;
    },
    orderReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    orderRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    orderRemove: (state, action) => {
      state.entities = state.entities.filter((u) => u._id !== action.payload);
    },
  },
});

const { reducer: ordersReducer, actions } = ordersSlice;
const {
  orderRequested,
  orderReceved,
  orderRequestFiled,
  orderCreated,
  orderRemove,
} = actions;

const createOrderFailed = createAction("orders/orderUCreatedFailed");
const createOrderRequested = createAction("orders/orderCreatedRequested");
const orderDeleteFailed = createAction("orders/orderDeleteFailed");
const orderDeleteRequested = createAction("orders/orderDeleteRequested");

export const loadOrdersList = () => async (dispatch) => {
  dispatch(orderRequested());
  try {
    const { content } = await ordersService.get();
    dispatch(orderReceved(content));
  } catch (error) {
    dispatch(orderRequestFiled(error.message));
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch(orderDeleteRequested());
  try {
    const { content } = await ordersService.remove(orderId);
    if (!content) {
      dispatch(orderRemove(orderId));
    }
  } catch (error) {
    dispatch(orderDeleteFailed(error.message));
  }
};

export const createOrder = (payload) => async (dispatch) => {
  dispatch(createOrderRequested());
  try {
    const { content } = await ordersService.create(payload);
    dispatch(orderCreated(content));
  } catch (error) {
    dispatch(createOrderFailed(error.message));
  }
};

export const getOrdersList = () => (state) => state.orders.entities;

export default ordersReducer;
