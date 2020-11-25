import isNil from "lodash/isNil";
import {
  CasesRecord,
  PandemicRecord,
  PopulationRecord,
  RegionCasesRecord,
  RegionPandemicRecord,
  RegionTestsRecord,
  TestsRecord,
} from "./types";

export function mapCasesRecord(
  entry: any,
  populations: PopulationRecord[],
): CasesRecord[] {
  return [];
}

export function mapRegionCasesRecord(
  entry: any,
  previous: RegionCasesRecord | undefined,
  populations: PopulationRecord[],
): RegionCasesRecord | null {
  const {
    r: region = null,
    c: cases = null,
    d: deaths = null,
    v: recovers = null,
    d: date = null,
  } = entry;
  const population = populations.find(p => p.region == region);
  const areDefined = [population, date, cases, deaths, recovers].some(isNil);
  if (!population || areDefined) return null;
  const activeCases = (previous?.activeCases ?? 0) + cases - deaths - recovers;
  const sumCases = (previous?.sumCases ?? 0) + cases;

  return {
    date,
    ...population,
    cases,
    sumCases,
    deaths,
    sumDeaths: (previous?.deaths ?? 0) + deaths,
    recovers,
    sumRecovers: previous?.recovers + recovers,
    activeCases,
    activeChange: activeCases - (previous?.activeCases ?? 0),
    increaseCases: sumCases / (previous?.sumCases ?? 1) - 1,
    increaseActive: cases / activeCases,
    casesPerMil: sumCases / population.population,
  };
}

export function mapTestsRecord(
  entry: any,
  previous: TestsRecord | undefined,
): TestsRecord | null {
  const {
    t: sumPeopleTested = null,
    e: sumTests = null,
    z: ordersPoz = null,
    p: sumPositive = null,
    n: sumNegativeAgainPositive = null,
    d: date = null,
  } = entry;

  return {
    date,
    sumPeopleTested,
    sumTests,
    ordersPoz,
    sumPositive,
    sumNegativeAgainPositive,
  };
}

export function mapTestsRegionRecord(
  entry: any,
  previous: RegionTestsRecord | undefined,
  populations: PopulationRecord[],
): RegionTestsRecord | null {
  const {
    t: sumTests = null,
    p: sumPositive = null,
    d: date = null,
    r: region = null,
  } = entry;

  return {
    date,
    population: 0,
    region,
    sumTests,
    sumPositive,
  };
}

export function mapPandemicRecord(
  entry: any,
  previous: PandemicRecord | undefined,
): PandemicRecord | null {
  const {
    h: hospitalized = null,
    b: bedsCount = null,
    u: respiratorsUsed = null,
    a: respiratorsAll = null,
    q: quarantine = null,
    i: inspection = null,
    d: date = null,
  } = entry;

  return {
    date,
    hospitalized,
    bedsCount,
    respiratorsUsed,
    respiratorsAll,
    quarantine,
    inspection,
  };
}

export function mapPandemicRegionRecord(
  entry: any,
  previous: RegionPandemicRecord | undefined,
  populations: PopulationRecord[],
): RegionPandemicRecord | null {
  const {
    h: hospitalized = null,
    b: bedsCount = null,
    u: respiratorsUsed = null,
    a: respiratorsAll = null,
    r: region = null,
    d: date = null,
  } = entry;

  return {
    date,
    hospitalized,
    bedsCount,
    respiratorsUsed,
    respiratorsAll,
    region,
    population: 0,
  };
}
