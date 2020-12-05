import groupBy from "lodash/groupBy";
import React, { useState } from "react";
import useMetadata from "../../../common/hooks/useMetadata";
import { WorkspaceViewProps } from "../../../workspace/types";
import ViewCard from "../generics/viewCard";
import RegionChartDialog from "./regionChartDialog";

export default function RegionChart(
  props: WorkspaceViewProps,
): JSX.Element | null {
  const magicPadding = 40;

  const { data } = useMetadata();
  const groups = groupBy(data?.regionCases, "region");
  const regions = Object.entries(groups).map(([region, records]) => ({
    id: region,
    data: records.map(record => ({ x: record.date, y: record.cases })),
  }));
  // console.log(groups, regions);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <ViewCard setIsEditOpen={setIsEditOpen} {...props}>
        {({ size }) => (
          <div style={{ height: (size.height ?? 100) - magicPadding }}>
            {/* <ResponsiveLineCanvas
            data={regions}
            margin={{
              bottom: 100,
              left: 50,
            }}
            lineWidth={0}
            enableGridX={false}
            pointSize={1}
            xScale={{
              type: "time",
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
              precision: "day",
            }}
            xFormat="time:%Y-%m-%dT%H:%M:%S.%LZ"
            axisBottom={{
              legend: "Date",
              tickRotation: 90,
              format: "%b %d",
            }}
          /> */}
          </div>
        )}
      </ViewCard>
      <RegionChartDialog
        view={props}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      />
    </>
  );
}
