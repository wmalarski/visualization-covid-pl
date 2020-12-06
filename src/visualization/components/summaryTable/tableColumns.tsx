import isNumber from "lodash/isNumber";
import React from "react";
import {
  Column,
  DataGridProps,
  FormatterProps,
  GroupFormatterProps,
  SelectColumn,
} from "react-data-grid";
import {
  CasesRecord,
  PandemicRecord,
  RegionCasesRecord,
  RegionPandemicRecord,
  RegionTestsRecord,
  TestsRecord,
} from "../../../common/types/types";

function dateColumn<T extends { date: number }>(): Column<T> {
  return {
    key: "date",
    name: "Date",
    width: 100,
    resizable: true,
    frozen: true,
    formatter({ row }: FormatterProps<T>): JSX.Element {
      return <>{new Date(row.date).toLocaleDateString()}</>;
    },
    groupFormatter({ childRows }: GroupFormatterProps<T>): JSX.Element {
      const first = childRows[0];
      return <>{first && new Date(first.date).toLocaleDateString()}</>;
    },
  };
}

type SelectedKeys<T, S> = {
  [k in keyof T]: T[k] extends S ? k : never;
}[keyof T];
type OnlySelectedType<T, S> = { [k in SelectedKeys<T, S>]: S };

type OnlyNumber<T> = OnlySelectedType<T, number>;

function sumGroupColumn<T>(t: keyof OnlyNumber<T>, name: string): Column<T> {
  return {
    key: t.toString(),
    name,
    groupFormatter({ childRows }: GroupFormatterProps<T>): JSX.Element {
      return (
        <>
          {childRows.reduce((prev, curr) => {
            const numbers = curr as any;
            const value = numbers[t];
            return prev + (isNumber(value) ? value : 0);
          }, 0)}
        </>
      );
    },
  };
}

export const casesRecordProps: DataGridProps<CasesRecord> = {
  rowKeyGetter: (row: CasesRecord) => row.date,
  rows: [],
  columns: [
    SelectColumn,
    dateColumn<CasesRecord>(),
    sumGroupColumn<CasesRecord>("cases", "Cases"),
    {
      key: "sumCases",
      name: "sumCases",
      width: 40,
      resizable: true,
    },
    sumGroupColumn<CasesRecord>("deaths", "Deaths"),
    {
      key: "sumDeaths",
      name: "sumDeaths",
      width: 40,
      resizable: true,
    },
    sumGroupColumn<CasesRecord>("recovers", "Recovers"),
    {
      key: "sumRecovers",
      name: "sumRecovers",
      width: 40,
      resizable: true,
    },
    sumGroupColumn<CasesRecord>("activeCases", "Active Cases"),
    {
      key: "activeChange",
      name: "activeChange",
      width: 40,
      resizable: true,
    },
    {
      key: "increaseCases",
      name: "increaseCases",
      width: 40,
      resizable: true,
    },
    {
      key: "increaseActive",
      name: "increaseActive",
      width: 40,
      resizable: true,
    },
    {
      key: "casesPerMil",
      name: "casesPerMil",
      width: 40,
      resizable: true,
    },
  ],
};

export const regionCasesRecordProps: DataGridProps<RegionCasesRecord> = {
  rowKeyGetter: (row: RegionCasesRecord) => `${row.date}-${row.region}`,
  rows: [],
  columns: [
    SelectColumn,
    dateColumn<RegionCasesRecord>(),
    {
      key: "region",
      name: "region",
      resizable: true,
    },
    sumGroupColumn<RegionCasesRecord>("cases", "Cases"),
    {
      key: "sumCases",
      name: "sumCases",
      width: 40,
      resizable: true,
    },
    sumGroupColumn<RegionCasesRecord>("deaths", "deaths"),
    {
      key: "sumDeaths",
      name: "sumDeaths",
      width: 40,
      resizable: true,
    },
    sumGroupColumn<RegionCasesRecord>("recovers", "recovers"),
    {
      key: "sumRecovers",
      name: "sumRecovers",
      width: 40,
      resizable: true,
    },
    sumGroupColumn<RegionCasesRecord>("activeCases", "activeCases"),
    {
      key: "activeChange",
      name: "activeChange",
      width: 40,
      resizable: true,
    },
    {
      key: "increaseCases",
      name: "increaseCases",
      width: 40,
      resizable: true,
    },
    {
      key: "increaseActive",
      name: "increaseActive",
      width: 40,
      resizable: true,
    },
    {
      key: "casesPerMil",
      name: "casesPerMil",
      width: 40,
      resizable: true,
    },
  ],
};

export const testsRecordProps: DataGridProps<TestsRecord> = {
  rowKeyGetter: (row: TestsRecord) => row.date,
  rows: [],
  columns: [
    SelectColumn,
    dateColumn<TestsRecord>(),
    {
      key: "sumPeopleTested",
      name: "sumPeopleTested",
      width: 40,
      resizable: true,
    },
    {
      key: "sumTests",
      name: "sumTests",
      width: 40,
      resizable: true,
    },
    {
      key: "ordersPoz",
      name: "ordersPoz",
      width: 40,
      resizable: true,
    },
    {
      key: "sumPositive",
      name: "sumPositive",
      width: 40,
      resizable: true,
    },
    {
      key: "sumNegativeAgainPositive",
      name: "sumNegativeAgainPositive",
      width: 40,
      resizable: true,
    },
  ],
};

export const regionTestsRecordProps: DataGridProps<RegionTestsRecord> = {
  rowKeyGetter: (row: RegionTestsRecord) => `${row.date}-${row.region}`,
  rows: [],
  columns: [
    SelectColumn,
    dateColumn<RegionTestsRecord>(),
    {
      key: "region",
      name: "region",
      width: 40,
      resizable: true,
    },
    {
      key: "sumTests",
      name: "sumTests",
      width: 40,
      resizable: true,
    },
    {
      key: "sumPositive",
      name: "sumPositive",
      width: 40,
      resizable: true,
    },
  ],
};

export const pandemicRecordProps: DataGridProps<PandemicRecord> = {
  rowKeyGetter: (row: PandemicRecord) => row.date,
  rows: [],
  columns: [
    SelectColumn,
    dateColumn<PandemicRecord>(),
    {
      key: "hospitalized",
      name: "hospitalized",
      width: 40,
      resizable: true,
    },
    {
      key: "bedsCount",
      name: "bedsCount",
      width: 40,
      resizable: true,
    },
    {
      key: "respiratorsUsed",
      name: "respiratorsUsed",
      width: 40,
      resizable: true,
    },
    {
      key: "respiratorsAll",
      name: "respiratorsAll",
      width: 40,
      resizable: true,
    },
    {
      key: "quarantine",
      name: "quarantine",
      width: 40,
      resizable: true,
    },
    {
      key: "inspection",
      name: "inspection",
      width: 40,
      resizable: true,
    },
  ],
};

export const regionPandemicRecordProps: DataGridProps<RegionPandemicRecord> = {
  rowKeyGetter: (row: RegionPandemicRecord) => `${row.date}-${row.region}`,
  rows: [],
  columns: [
    SelectColumn,
    dateColumn<RegionPandemicRecord>(),
    {
      key: "region",
      name: "region",
      width: 40,
      resizable: true,
    },
    {
      key: "hospitalized",
      name: "hospitalized",
      width: 40,
      resizable: true,
    },
    {
      key: "bedsCount",
      name: "bedsCount",
      width: 40,
      resizable: true,
    },
    {
      key: "respiratorsUsed",
      name: "respiratorsUsed",
      width: 40,
      resizable: true,
    },
    {
      key: "respiratorsAll",
      name: "respiratorsAll",
      width: 40,
      resizable: true,
    },
  ],
};
