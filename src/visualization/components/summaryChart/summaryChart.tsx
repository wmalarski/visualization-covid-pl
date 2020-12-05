import React from "react";
import WorkspaceCard from "../../../workspace/components/workspaceCard";
import { WorkspaceViewProps } from "../../../workspace/types";

export default function SummaryChart(
  props: WorkspaceViewProps,
): JSX.Element | null {
  return (
    <WorkspaceCard {...props}>
      <p>Summary Chart</p>
    </WorkspaceCard>
  );
}
