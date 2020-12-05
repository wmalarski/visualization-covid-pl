import React, { useState } from "react";
import { WorkspaceViewProps } from "../../../workspace/types";
import ViewCard from "../generics/viewCard";
import SummaryChartDialog from "./summaryChartDialog";

export default function SummaryChart(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <ViewCard setIsEditOpen={setIsEditOpen} {...props}>
        <p>Summary Chart</p>
      </ViewCard>
      <SummaryChartDialog
        view={props}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />
    </>
  );
}
