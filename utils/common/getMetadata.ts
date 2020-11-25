import fetch from "isomorphic-unfetch";
import last from "lodash/last";
import { MetadataContextValue } from "./metadataContext";
import {
  mapCasesRecord,
  mapPandemicRecord,
  mapPandemicRegionRecord,
  mapRegionCasesRecord,
  mapTestsRecord,
  mapTestsRegionRecord,
} from "./recordMappers";
import {
  PandemicRecord,
  PopulationRecord,
  RegionCasesRecord,
  RegionPandemicRecord,
  RegionTestsRecord,
  TestsRecord,
} from "./types";

function recordReducer<T>(
  entries: any,
  mapper: (prev: T[], curr: any) => T | null,
): T[] {
  return (entries as any[]).reduce<T[]>((prev, curr) => {
    const record = mapper(prev, curr);
    return record ? [...prev, record] : prev;
  }, []);
}

export default async function getMetadata(): Promise<MetadataContextValue> {
  const res = await fetch("http://localhost:3000/api/data");
  const spreadsheetData = await res.json();
  const population = spreadsheetData.population as PopulationRecord[];

  return {
    githubLink: process.env.GITHUB_LINK ?? "",
    spreadsheetData: {
      id: spreadsheetData._id,
      date: spreadsheetData.date,
      population,
      cases: mapCasesRecord(spreadsheetData.summary, population),
      regionCases: recordReducer<RegionCasesRecord>(
        spreadsheetData.summary,
        (prev, curr) => mapRegionCasesRecord(curr, last(prev), population),
      ),
      tests: recordReducer<TestsRecord>(spreadsheetData.tests, (prev, curr) =>
        mapTestsRecord(curr, last(prev)),
      ),
      regionTests: recordReducer<RegionTestsRecord>(
        spreadsheetData.regionTests,
        (prev, curr) => mapTestsRegionRecord(curr, last(prev), population),
      ),
      pandemic: recordReducer<PandemicRecord>(
        spreadsheetData.pandemic,
        (prev, curr) => mapPandemicRecord(curr, last(prev)),
      ),
      regionPandemic: recordReducer<RegionPandemicRecord>(
        spreadsheetData.regionPandemic,
        (prev, curr) => mapPandemicRegionRecord(curr, last(prev), population),
      ),
    },
  };
}
