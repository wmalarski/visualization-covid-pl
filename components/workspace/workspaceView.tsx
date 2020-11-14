import React from "react";
import { VisualizationTypes } from "../../utils/visualization/types";
import { WorkspaceViewProps } from "../../utils/workspace/types";
import RegionChart from "../visualization/regionChart";
import SummaryChart from "../visualization/summaryChart";

export default function WorkspaceView(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const { type } = props.config.attributes;

  switch (type) {
    case VisualizationTypes.REGION_CHART:
      return <RegionChart {...props} />;
    case VisualizationTypes.SUMMARY_CHART:
      return <SummaryChart {...props} />;
    default:
      return null;
  }
}
