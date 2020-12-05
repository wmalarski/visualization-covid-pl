import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useSelector } from "react-redux";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import Layout from "../../common/components/layout";
import { useRootDispatch } from "../../common/store";
import { workspaceLayoutsSelector, workspaceViewsSelector } from "../selectors";
import { updateViews } from "../slice";
import ControllerPopover from "./controllerPopover";
import DialogsMenu from "./dialogsMenu";
import ViewsMenu from "./viewsMenu";
import WorkspaceView from "./workspaceView";

const ReactGridLayout = WidthProvider(RGL);

export interface WorkspaceProps {
  rowHeight?: number;
  cols?: number;
}

export default function Workspace(props: WorkspaceProps): JSX.Element {
  const { rowHeight = 50, cols = 10 } = props;
  const dispatch = useRootDispatch();
  const views = useSelector(workspaceViewsSelector);
  const layout = useSelector(workspaceLayoutsSelector);

  return (
    <Layout
      header={
        <>
          <DialogsMenu />
          <ViewsMenu />
          <ControllerPopover />
        </>
      }
    >
      <>
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={cols}
          rowHeight={rowHeight}
          onLayoutChange={layouts =>
            dispatch(
              updateViews(layouts.map(layout => ({ key: layout.i, layout }))),
            )
          }
        >
          {views
            .filter(view => view.config.visible)
            .map(view => (
              <div key={view.layout.i}>
                <WorkspaceView {...view} />
              </div>
            ))}
        </ReactGridLayout>
      </>
    </Layout>
  );
}
