import { WorkspaceState, WorkspaceView } from "./types";

export function workspaceViewsSelector(state: WorkspaceState): WorkspaceView[] {
  return state.views;
}
