import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "../workspace/slice";

export type RootState = ReturnType<typeof workspaceReducer>;

const store = configureStore({
  reducer: workspaceReducer,
});

export default store;
