import React from "react";
import { WorkspaceViewProps } from "../../../workspace/types";
import ViewCard from "../generics/viewCard";

export default function SummaryChart(
  props: WorkspaceViewProps,
): JSX.Element | null {
  return (
    <ViewCard {...props}>
      <p>Summary Chart</p>
    </ViewCard>
  );
}
