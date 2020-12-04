import isNil from "lodash/isNil";
import last from "lodash/last";
import {
  PandemicInput,
  RegionPandemicInput,
  RegionTestsInput,
  SpreadsheetInput,
  SummaryInput,
  TestsInput,
} from "../input";
import {
  CasesRecord,
  PandemicRecord,
  PopulationRecord,
  RegionCasesRecord,
  RegionPandemicRecord,
  RegionTestsRecord,
  SpreadsheetData,
  TestsRecord,
} from "../types";

export function mapCasesRecord(
  entry: SummaryInput[],
  populations: PopulationRecord[],
): CasesRecord[] {
  return [];
}

export function mapRegionCasesRecord(
  entry: SummaryInput,
  previous: RegionCasesRecord | undefined,
  populations: PopulationRecord[],
): RegionCasesRecord | null {
  const { r: region, c, e, v, d: date } = entry;
  const cases = c ?? 0;
  const deaths = e ?? 0;
  const recovers = v ?? 0;

  const population = populations.find(p => p.region == region);
  const areDefined = [population, date, cases, deaths, recovers].some(isNil);
  if (!population || areDefined) return null;
  const activeCases = (previous?.activeCases ?? 0) + cases - deaths - recovers;
  const sumCases = (previous?.sumCases ?? 0) + cases;

  return {
    date: Date.parse(date),
    ...population,
    cases,
    sumCases,
    deaths,
    sumDeaths: (previous?.deaths ?? 0) + deaths,
    recovers,
    sumRecovers: (previous?.recovers ?? 0) + recovers,
    activeCases,
    activeChange: activeCases - (previous?.activeCases ?? 0),
    increaseCases: sumCases / (previous?.sumCases ?? 1) - 1,
    increaseActive: cases / activeCases,
    casesPerMil: sumCases / population.population,
  };
}

export function mapTestsRecord(
  entry: TestsInput,
  previous: TestsRecord | undefined,
): TestsRecord | null {
  const {
    t: sumPeopleTested = null,
    e: sumTests = null,
    z: ordersPoz = null,
    p: sumPositive = null,
    n: sumNegativeAgainPositive = null,
    d: date,
  } = entry;

  return {
    date: Date.parse(date),
    sumPeopleTested,
    sumTests,
    ordersPoz,
    sumPositive,
    sumNegativeAgainPositive,
  };
}

export function mapTestsRegionRecord(
  entry: RegionTestsInput,
  previous: RegionTestsRecord | undefined,
  populations: PopulationRecord[],
): RegionTestsRecord | null {
  const {
    t: sumTests = null,
    p: sumPositive = null,
    d: date,
    r: region,
  } = entry;

  return {
    date: Date.parse(date),
    population: 0,
    region,
    sumTests,
    sumPositive,
  };
}

export function mapPandemicRecord(
  entry: PandemicInput,
  previous: PandemicRecord | undefined,
): PandemicRecord | null {
  const {
    h: hospitalized = null,
    b: bedsCount = null,
    u: respiratorsUsed = null,
    a: respiratorsAll = null,
    q: quarantine = null,
    i: inspection = null,
    d: date,
  } = entry;

  return {
    date: Date.parse(date),
    hospitalized,
    bedsCount,
    respiratorsUsed,
    respiratorsAll,
    quarantine,
    inspection,
  };
}

export function mapPandemicRegionRecord(
  entry: RegionPandemicInput,
  previous: RegionPandemicRecord | undefined,
  populations: PopulationRecord[],
): RegionPandemicRecord | null {
  const {
    h: hospitalized = null,
    b: bedsCount = null,
    u: respiratorsUsed = null,
    a: respiratorsAll = null,
    r: region,
    d: date,
  } = entry;

  return {
    date: Date.parse(date),
    hospitalized,
    bedsCount,
    respiratorsUsed,
    respiratorsAll,
    region,
    population: 0,
  };
}

function recordReducer<T>(
  entries: any,
  mapper: (prev: T[], curr: any) => T | null,
): T[] {
  return (entries as any[]).reduce<T[]>((prev, curr) => {
    const record = mapper(prev, curr);
    return record ? [...prev, record] : prev;
  }, []);
}

export default function getData(input: SpreadsheetInput): SpreadsheetData {
  const {
    _id,
    date,
    pandemic,
    population,
    regionPandemic,
    regionTests,
    summary,
    tests,
  } = input;

  return {
    id: _id,
    date: date,
    population,
    cases: mapCasesRecord(summary, population),
    regionCases: recordReducer<RegionCasesRecord>(summary, (prev, curr) =>
      mapRegionCasesRecord(curr, last(prev), population),
    ),
    tests: recordReducer<TestsRecord>(tests, (prev, curr) =>
      mapTestsRecord(curr, last(prev)),
    ),
    regionTests: recordReducer<RegionTestsRecord>(regionTests, (prev, curr) =>
      mapTestsRegionRecord(curr, last(prev), population),
    ),
    pandemic: recordReducer<PandemicRecord>(pandemic, (prev, curr) =>
      mapPandemicRecord(curr, last(prev)),
    ),
    regionPandemic: recordReducer<RegionPandemicRecord>(
      regionPandemic,
      (prev, curr) => mapPandemicRegionRecord(curr, last(prev), population),
    ),
  };
}
