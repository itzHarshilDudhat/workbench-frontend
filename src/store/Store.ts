import { configureStore } from "@reduxjs/toolkit";
import baseSlice from "./slice/Base";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  base: baseSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["base"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
