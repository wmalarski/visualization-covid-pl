import * as t from "io-ts";

export const SummaryInput = t.strict({
  c: t.union([t.number, t.null]),
  e: t.union([t.number, t.null]),
  v: t.union([t.number, t.null]),
  d: t.string,
  r: t.string,
});
export type SummaryInput = t.TypeOf<typeof SummaryInput>;

export const TestsInput = t.strict({
  t: t.union([t.number, t.null]),
  e: t.union([t.number, t.null]),
  z: t.union([t.number, t.null]),
  p: t.union([t.number, t.null]),
  n: t.union([t.number, t.null]),
  d: t.string,
});
export type TestsInput = t.TypeOf<typeof TestsInput>;

export const RegionTestsInput = t.strict({
  t: t.union([t.number, t.null]),
  p: t.union([t.number, t.null]),
  d: t.string,
  r: t.string,
});
export type RegionTestsInput = t.TypeOf<typeof RegionTestsInput>;

export const PandemicInput = t.strict({
  h: t.union([t.number, t.null]),
  b: t.union([t.number, t.null]),
  u: t.union([t.number, t.null]),
  a: t.union([t.number, t.null]),
  q: t.union([t.number, t.null]),
  i: t.union([t.number, t.null]),
  d: t.string,
});
export type PandemicInput = t.TypeOf<typeof PandemicInput>;

export const RegionPandemicInput = t.strict({
  h: t.union([t.number, t.null]),
  b: t.union([t.number, t.null]),
  u: t.union([t.number, t.null]),
  a: t.union([t.number, t.null]),
  d: t.string,
  r: t.string,
});
export type RegionPandemicInput = t.TypeOf<typeof RegionPandemicInput>;

export const PopulationInput = t.strict({
  region: t.string,
  population: t.number,
});

export const SpreadsheetInput = t.strict({
  _id: t.string,
  date: t.string,
  summary: t.array(SummaryInput),
  tests: t.array(TestsInput),
  regionTests: t.array(RegionTestsInput),
  pandemic: t.array(PandemicInput),
  regionPandemic: t.array(RegionPandemicInput),
  population: t.array(PopulationInput),
});
export type SpreadsheetInput = t.TypeOf<typeof SpreadsheetInput>;
