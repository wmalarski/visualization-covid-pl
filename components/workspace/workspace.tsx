import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import React, { useMemo, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useSelector } from "react-redux";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { useRootDispatch } from "../../utils/store";
import { workspaceViewsSelector } from "../../utils/workspace/selectors";
import { updateViews } from "../../utils/workspace/slice";
import Layout from "../common/layout";
import RegionChartDialog from "../viewDialog/regionChartDialog";
import SummaryChartDialog from "../viewDialog/summaryChartDialog";
import SummaryTableDialog from "../viewDialog/summaryTableDialog";
import WorkspaceView from "./workspaceView";

const ReactGridLayout = WidthProvider(RGL);

export default function Workspace(): JSX.Element {
  const dispatch = useRootDispatch();
  const views = useSelector(workspaceViewsSelector);
  const layout = useMemo(() => views.map(view => view.layout), [views]);

  const [isSummaryTableOpen, setIsSummaryTableOpen] = useState(false);
  const [isRegionChartOpen, setIsRegionChartOpen] = useState(false);
  const [isSummaryChartOpen, setIsSummaryChartOpen] = useState(false);
  // const metadata = useMetadata();
  // console.log(metadata.spreadsheetData);

  return (
    <Layout
      header={
        <>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setIsSummaryTableOpen(true)}
          >
            Table
          </Button>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setIsRegionChartOpen(true)}
          >
            Region Chart
          </Button>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setIsSummaryChartOpen(true)}
          >
            Summary Chart
          </Button>
        </>
      }
    >
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
      <RegionChartDialog
        isOpen={isRegionChartOpen}
        setIsOpen={setIsRegionChartOpen}
      />
      <SummaryTableDialog
        isOpen={isSummaryTableOpen}
        setIsOpen={setIsSummaryTableOpen}
      />
      <SummaryChartDialog
        isOpen={isSummaryChartOpen}
        setIsOpen={setIsSummaryChartOpen}
      />
    </Layout>
  );
}
