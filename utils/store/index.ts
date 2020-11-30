import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import visualizationReducer from "../visualization/slice";
import workspaceReducer from "../workspace/slice";

export const rootReducer = combineReducers({
  workspace: workspaceReducer,
  visualization: visualizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootDispatch = typeof store.dispatch;
export const useRootDispatch = () => useDispatch<RootDispatch>();
