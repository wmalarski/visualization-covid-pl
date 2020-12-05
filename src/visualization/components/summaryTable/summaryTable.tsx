import React from "react";
import WorkspaceCard from "../../../workspace/components/workspaceCard";
import { WorkspaceViewProps } from "../../../workspace/types";

export default function SummaryTable(
  props: WorkspaceViewProps,
): JSX.Element | null {
  return (
    <WorkspaceCard {...props}>
      <p>SummaryTable</p>
    </WorkspaceCard>
  );
}
