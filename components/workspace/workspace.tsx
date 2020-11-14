import Button from "@material-ui/core/Button";
import React, { useMemo } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useSelector } from "react-redux";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { useRootDispatch } from "../../utils/store";
import { workspaceViewsSelector } from "../../utils/workspace/selectors";
import { updateViews } from "../../utils/workspace/slice";
import WorkspaceView from "./workspaceView";

const ReactGridLayout = WidthProvider(RGL);

export default function Workspace(): JSX.Element {
  const dispatch = useRootDispatch();
  const views = useSelector(workspaceViewsSelector);
  const layout = useMemo(() => views.map(view => view.layout), [views]);

  return (
    <div>
      <p>Workspace</p>
      <Button
        onClick={() => {
          // dispatch(increment());
        }}
      >
        Click
      </Button>
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        onLayoutChange={layouts =>
          dispatch(
            updateViews(layouts.map(layout => ({ key: layout.i, layout }))),
          )
        }
      >
        {views.map(view => (
          <div key={view.layout.i}>
            <WorkspaceView {...view} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
