import React from "react";
import { WorkspaceViewProps } from "../../utils/workspace/types";
import WorkspaceCard from "../workspace/workspaceCard";

export default function SummaryTable(
  props: WorkspaceViewProps,
): JSX.Element | null {
  return (
    <WorkspaceCard {...props}>
      <p>SummaryTable</p>
    </WorkspaceCard>
  );
}
