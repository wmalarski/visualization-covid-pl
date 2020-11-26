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
  regions?: string[];
}

export type VisualizationAttributes =
  | SummaryChartAttributes
  | RegionChartAttributes
  | SummaryTableAttributes;
