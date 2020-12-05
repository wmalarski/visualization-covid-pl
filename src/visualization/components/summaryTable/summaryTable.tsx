import React, { useState } from "react";
import { WorkspaceViewProps } from "../../../workspace/types";
import ViewCard from "../generics/viewCard";
import SummaryTableDialog from "./summaryTableDialog";

export default function SummaryTable(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <ViewCard {...props} setIsEditOpen={setIsEditOpen}>
        <p>SummaryTable</p>
      </ViewCard>
      <SummaryTableDialog
        view={props}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />
    </>
  );
}
