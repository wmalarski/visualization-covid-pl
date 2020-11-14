import { WorkspaceState, WorkspaceViewProps } from "./types";

export function workspaceViewsSelector(
  state: WorkspaceState,
): WorkspaceViewProps[] {
  return state.views;
}
