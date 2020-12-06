import { makeStyles, Theme } from "@material-ui/core/styles";
import rowGrouper from "lodash/groupBy";
import React, { CSSProperties, useRef, useState } from "react";
import ReactDataGrid, { DataGridHandle } from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import { SizeMeProps } from "react-sizeme";
import useMetadata from "../../../common/hooks/useMetadata";
import { RecordType } from "../../../common/types/types";
import { WorkspaceViewProps } from "../../../workspace/types";
import { VisualizationTypes } from "../../types";
import ViewCard from "../generics/viewCard";
import SummaryTableDialog from "./summaryTableDialog";
import {
  casesRecordProps,
  pandemicRecordProps,
  regionCasesRecordProps,
  regionPandemicRecordProps,
  regionTestsRecordProps,
  testsRecordProps,
} from "./tableColumns";

const useStyles = makeStyles((theme: Theme) => ({
  allFeatures: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));

function getStyle(sizeMeProps: SizeMeProps): CSSProperties {
  const { size } = sizeMeProps;
  return { height: size.height ? size.height - 40 : "auto" };
}

export default function SummaryTable(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const { config } = props;
  const { attributes } = config;

  const classes = useStyles();
  const { data } = useMetadata();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());
  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () => new Set<unknown>(),
  );
  const gridRef = useRef<DataGridHandle>(null);

  if (attributes.type !== VisualizationTypes.SUMMARY_TABLE) return null;
  const recordType: RecordType =
    attributes.recordType ?? RecordType.RegionCasesRecord;

  return (
    <>
      <ViewCard
        {...props}
        isOverflowHidden={true}
        setIsEditOpen={setIsEditOpen}
      >
        {({ size }) => {
          const commonProps = {
            style: { height: size.height ? size.height - 40 : "auto" },
            ref: gridRef,
            selectedRows,
            onSelectedRowsChange: setSelectedRows,
            expandedGroupIds,
            onExpandedGroupIdsChange: setExpandedGroupIds,
          };
          switch (recordType) {
            case RecordType.CasesRecord:
              return (
                <ReactDataGrid
                  {...casesRecordProps}
                  {...commonProps}
                  rows={data?.cases ?? []}
                />
              );
            case RecordType.RegionCasesRecord:
              return (
                <ReactDataGrid
                  {...regionCasesRecordProps}
                  {...commonProps}
                  groupBy={["date"]}
                  rowGrouper={rowGrouper}
                  rows={data?.regionCases ?? []}
                />
              );
            case RecordType.TestsRecord:
              return (
                <ReactDataGrid
                  {...testsRecordProps}
                  {...commonProps}
                  rows={data?.tests ?? []}
                />
              );
            case RecordType.RegionTestsRecord:
              return (
                <ReactDataGrid
                  {...regionTestsRecordProps}
                  {...commonProps}
                  rows={data?.regionTests ?? []}
                />
              );
            case RecordType.PandemicRecord:
              return (
                <ReactDataGrid
                  {...pandemicRecordProps}
                  {...commonProps}
                  rows={data?.pandemic ?? []}
                />
              );
            case RecordType.RegionPandemicRecord:
              return (
                <ReactDataGrid
                  {...regionPandemicRecordProps}
                  {...commonProps}
                  rows={data?.regionPandemic ?? []}
                />
              );
          }
        }}
      </ViewCard>
      <SummaryTableDialog
        view={props}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />
    </>
  );
}
