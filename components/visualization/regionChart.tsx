import { ResponsiveLine } from "@nivo/line";
import React from "react";
import useMetadata from "../../utils/common/useMetadata";
import { WorkspaceViewProps } from "../../utils/workspace/types";
import WorkspaceCard from "../workspace/workspaceCard";

export default function RegionChart(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const magicPadding = 40;

  const { spreadsheetData } = useMetadata();
  // console.log(spreadsheetData);

  // spreadsheetData?.regionCases.map(cases => )
  const data = [
    {
      id: "sss",
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 25 },
      ],
    },
    {
      id: "sasa",
      data: [
        { x: 1, y: -20 },
        { x: 5, y: 35 },
        { x: 10, y: 30 },
      ],
    },
  ];

  return (
    <WorkspaceCard {...props}>
      {({ size }) => (
        <div style={{ height: (size.height ?? 100) - magicPadding }}>
          <ResponsiveLine data={data} />
        </div>
      )}
    </WorkspaceCard>
  );
}
