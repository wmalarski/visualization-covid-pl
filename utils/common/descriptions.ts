import { SourceDescription, SourceTypes } from "./sources";

export const summarySourceDescription: SourceDescription[] = [
  {
    type: SourceTypes.IDENTIFY,
    key: "d",
    name: "Date",
  },
  {
    type: SourceTypes.IDENTIFY,
    key: "population",
    name: "Population",
  },
  {
    type: SourceTypes.IDENTIFY,
    key: "region",
    name: "Region",
  },
  {
    type: SourceTypes.IDENTIFY,
    key: "c",
    name: "Cases",
  },
  {
    type: SourceTypes.ACCUMULATIVE,
    name: "Summary Cases",
    source: {
      type: SourceTypes.IDENTIFY,
      key: "c",
    },
  },
  {
    type: SourceTypes.IDENTIFY,
    key: "e",
    name: "Deaths",
  },
  {
    type: SourceTypes.ACCUMULATIVE,
    name: "Summary Deaths",
    source: {
      type: SourceTypes.IDENTIFY,
      key: "e",
    },
  },
];
