export enum SourceTypes {
  IDENTIFY = "IDENTIFY",
  ACCUMULATIVE = "ACCUMULATIVE",
  DIFFERENTIAL = "DIFFERENTIAL",
  DIVISION = "DIVISION",
  ADDITION = "ADDITION",
  SUBTRACTION = "SUBTRACTION",
}

export interface IdentifySource {
  type: SourceTypes.IDENTIFY;
  name?: string;
  key: string;
}

export interface AccumulativeSource {
  type: SourceTypes.ACCUMULATIVE;
  name?: string;
  source: SourceDescription;
}

export interface DifferentialSource {
  type: SourceTypes.DIFFERENTIAL;
  name?: string;
  source: SourceDescription;
}

export interface DivisionSource {
  type: SourceTypes.DIVISION;
  name?: string;
  source1: SourceDescription;
  source2: SourceDescription;
}

export interface AdditionSource {
  type: SourceTypes.ADDITION;
  name?: string;
  source1: SourceDescription;
  source2: SourceDescription;
}

export interface SubtractionSource {
  type: SourceTypes.SUBTRACTION;
  name?: string;
  source1: SourceDescription;
  source2: SourceDescription;
}

export type SourceDescription =
  | IdentifySource
  | AccumulativeSource
  | DifferentialSource
  | DivisionSource
  | AdditionSource
  | SubtractionSource;
