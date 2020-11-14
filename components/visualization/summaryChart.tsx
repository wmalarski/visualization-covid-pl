import React from "react";
import { WorkspaceViewProps } from "../../utils/workspace/types";
import WorkspaceCard from "../workspace/workspaceCard";

export default function SummaryChart(
  props: WorkspaceViewProps,
): JSX.Element | null {
  return (
    <WorkspaceCard {...props}>
      <p>Summary Chart</p>
    </WorkspaceCard>
  );
}
