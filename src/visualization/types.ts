import { RecordType } from "../common/types/types";

export enum VisualizationTypes {
  SUMMARY_CHART = "SUMMARY_CHART",
  REGION_CHART = "REGION_CHART",
  SUMMARY_TABLE = "SUMMARY_TABLE",
}

export interface SummaryChartAttributes {
  type: VisualizationTypes.SUMMARY_CHART;
  cumulative: boolean;
}

export interface RegionChartAttributes {
  type: VisualizationTypes.REGION_CHART;
  cumulative: boolean;
  regions?: string[];
}

export interface SummaryTableAttributes {
  type: VisualizationTypes.SUMMARY_TABLE;
  recordType?: RecordType;
}

export type VisualizationAttributes =
  | SummaryChartAttributes
  | RegionChartAttributes
  | SummaryTableAttributes;

export interface VisualizationTimeRange {
  fromDate?: string;
  toDate?: string;
}

export interface VisualizationState {
  regions?: string[];
  timeRange?: VisualizationTimeRange;
  selectedRegions: string[];
  selectedDates: string[];
}
