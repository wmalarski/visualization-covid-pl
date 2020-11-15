export interface SummaryRecord {
  date: string;
  region: string;
  cases: number | null;
  deaths: number | null;
  recovers: number | null;
}

export interface TestsRecord {
  date: string;
  sumPeopleTested: number | null;
  sumTests: number | null;
  ordersPoz: number | null;
  sumPositive: number | null;
  sumNegativeAgainPositive: number | null;
}

export interface TestsRegionRecord {
  date: string;
  region: string;
  sumTests: number | null;
  sumPositive: number | null;
}

export interface PandemicRecord {
  date: string;
  hospitalized: number | null;
  bedsCount: number | null;
  respiratorsUsed: number | null;
  respiratorsAll: number | null;
  quarantine: number | null;
  inspection: number | null;
}

export interface PandemicRegionRecord {
  date: string;
  region: string;
  hospitalized: number | null;
  bedsCount: number | null;
  respiratorsUsed: number | null;
  respiratorsAll: number | null;
}

export interface PopulationRecord {
  region: string;
  population: number;
}

export interface SpreadsheetData {
  id: string;
  date: string;
  summary: SummaryRecord[];
  tests: TestsRecord[];
  pandemic: PandemicRecord[];
  regionPandemic: PandemicRegionRecord[];
  population: PopulationRecord[];
}
