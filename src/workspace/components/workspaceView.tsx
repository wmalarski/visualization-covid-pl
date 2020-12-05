import React from "react";
import RegionChart from "../../visualization/components/regionChart/regionChart";
import SummaryChart from "../../visualization/components/summaryChart/summaryChart";
import SummaryTable from "../../visualization/components/summaryTable/summaryTable";
import { VisualizationTypes } from "../../visualization/types";
import { WorkspaceViewProps } from "../types";

export default function WorkspaceView(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const { type } = props.config.attributes;

  switch (type) {
    case VisualizationTypes.REGION_CHART:
      return <RegionChart {...props} />;
    case VisualizationTypes.SUMMARY_CHART:
      return <SummaryChart {...props} />;
    case VisualizationTypes.SUMMARY_TABLE:
      return <SummaryTable {...props} />;
    default:
      return null;
  }
}
