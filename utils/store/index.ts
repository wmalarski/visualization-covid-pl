import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import workspaceReducer from "../workspace/slice";

export type RootState = ReturnType<typeof workspaceReducer>;

const store = configureStore({
  reducer: workspaceReducer,
});

export default store;

export type RootDispatch = typeof store.dispatch;
export const useRootDispatch = () => useDispatch<RootDispatch>();
