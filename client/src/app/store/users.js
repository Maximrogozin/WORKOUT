import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
const { createSlice, createAction } = require("@reduxjs/toolkit");

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      userId: localStorageService.getUserId(),
      rootAdmin: false,
      rootManager: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      userId: null,
      rootAdmin: false,
      rootManager: false,
    };
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRoot: (state, action) => {
      const user = state.entities.find((entity) => entity._id === state.userId);
      if (user) {
        state.rootAdmin = user.rootAdmin;
        state.rootManager = user.rootManager;
      }
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    userRemove: (state, action) => {
      state.entities = state.entities.filter((u) => u._id !== action.payload);
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFiled,
  userUpdateSuccessed,
  userRemove,
  usersRoot,
} = actions;

const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userDeleteFailed = createAction("users/userDeleteFailed");
const userDeleteRequested = createAction("users/userDeleteRequested");

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
    dispatch(usersRoot());
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdateSuccessed(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(userDeleteRequested());
  try {
    const { content } = await userService.remove(userId);
    if (!content) {
      dispatch(userRemove(userId));
    }
  } catch (error) {
    dispatch(userDeleteFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;
export const getIsRootAdmin = () => (state) => state.users.rootAdmin;
export const getIsRootManager = () => (state) => state.users.rootManager;

export default usersReducer;
