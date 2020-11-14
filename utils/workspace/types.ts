import GridLayout from "react-grid-layout";

export interface WorkspaceViewProps {
  title: string;
}

export interface WorkspaceView {
  layout: GridLayout.Layout;
  props: WorkspaceViewProps;
}

export interface WorkspaceState {
  views: WorkspaceView[];
}

export interface UpdateViewArgument {
  viewId: string;
  layout?: Partial<GridLayout.Layout>;
  props?: Partial<WorkspaceViewProps>;
}
