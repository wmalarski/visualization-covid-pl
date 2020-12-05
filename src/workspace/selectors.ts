import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../common/store";
import { WorkspaceState } from "./types";

export const workspaceSelector = (state: RootState): WorkspaceState =>
  state.workspace;

export const workspaceViewsSelector = createSelector(
  workspaceSelector,
  state => state.views,
);

export const workspaceLayoutsSelector = createSelector(
  workspaceViewsSelector,
  views => views.filter(view => view.config.visible).map(view => view.layout),
);
