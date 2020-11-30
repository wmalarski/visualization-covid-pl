import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { useSelector } from "react-redux";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { useRootDispatch } from "../../utils/store";
import {
  workspaceLayoutsSelector,
  workspaceViewsSelector,
} from "../../utils/workspace/selectors";
import { updateViews } from "../../utils/workspace/slice";
import Layout from "../common/layout";
import RegionChartDialog from "../viewDialog/regionChartDialog";
import SummaryChartDialog from "../viewDialog/summaryChartDialog";
import SummaryTableDialog from "../viewDialog/summaryTableDialog";
import VisualizationController from "../visualization/visualizationController";
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

  const [isSummaryTableOpen, setIsSummaryTableOpen] = useState(false);
  const [isRegionChartOpen, setIsRegionChartOpen] = useState(false);
  const [isSummaryChartOpen, setIsSummaryChartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const theme = useTheme();

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
      rightHeader={
        <Button
          startIcon={<SearchIcon />}
          onClick={() => setIsFiltersOpen(v => !v)}
          style={{
            backgroundColor: isFiltersOpen
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
          }}
        >
          Filters
        </Button>
      }
    >
      <>
        {isFiltersOpen && (
          <VisualizationController
            onCloseClicked={() => setIsFiltersOpen(v => !v)}
          />
        )}
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
      </>
    </Layout>
  );
}
