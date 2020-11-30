import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { WorkspaceState } from "./types";

export const workspaceSelector = (state: RootState): WorkspaceState =>
  state.workspace;

export const workspaceViewsSelector = createSelector(
  workspaceSelector,
  state => state.views,
);

export const workspaceLayoutsSelector = createSelector(
  workspaceViewsSelector,
  views => views.map(view => view.layout),
);
