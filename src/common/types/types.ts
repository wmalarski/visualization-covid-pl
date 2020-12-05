export interface RegionCasesRecord {
  date: number;
  region: string;
  population: number;
  cases: number;
  sumCases: number;
  deaths: number;
  sumDeaths: number;
  recovers: number;
  sumRecovers: number;
  activeCases: number;
  activeChange: number;
  increaseCases: number;
  increaseActive: number;
  casesPerMil: number;
}

export interface CasesRecord {
  date: number;
  cases: number;
  sumCases: number;
  deaths: number;
  sumDeaths: number;
  recovers: number;
  sumRecovers: number;
  activeCases: number;
  activeChange: number;
  increaseCases: number;
  increaseActive: number;
  casesPerMil: number;
}

export interface TestsRecord {
  date: number;
  sumPeopleTested: number | null;
  sumTests: number | null;
  ordersPoz: number | null;
  sumPositive: number | null;
  sumNegativeAgainPositive: number | null;
}

export interface RegionTestsRecord {
  date: number;
  region: string;
  population: number;
  sumTests: number | null;
  sumPositive: number | null;
}

export interface PandemicRecord {
  date: number;
  hospitalized: number | null;
  bedsCount: number | null;
  respiratorsUsed: number | null;
  respiratorsAll: number | null;
  quarantine: number | null;
  inspection: number | null;
}

export interface RegionPandemicRecord {
  date: number;
  region: string;
  population: number;
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
  cases: CasesRecord[];
  regionCases: RegionCasesRecord[];
  tests: TestsRecord[];
  regionTests: RegionTestsRecord[];
  pandemic: PandemicRecord[];
  regionPandemic: RegionPandemicRecord[];
  population: PopulationRecord[];
}
