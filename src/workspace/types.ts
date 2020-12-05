import GridLayout from "react-grid-layout";
import { VisualizationAttributes } from "../visualization/types";

export interface WorkspaceViewConfig {
  title: string;
  subheader?: string;
  visible: boolean;
  attributes: VisualizationAttributes;
}

export interface WorkspaceViewProps {
  layout: GridLayout.Layout;
  config: WorkspaceViewConfig;
}

export interface WorkspaceViewArgs {
  layout?: Partial<GridLayout.Layout>;
  config: WorkspaceViewConfig;
}

export interface WorkspaceState {
  views: WorkspaceViewProps[];
}

export interface UpdateViewArgument {
  key: string;
  layout?: Partial<GridLayout.Layout>;
  config?: Partial<WorkspaceViewConfig>;
}

export interface ViewDialogProps {
  view?: WorkspaceViewProps;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
