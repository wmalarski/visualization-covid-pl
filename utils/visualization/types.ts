export enum VisualizationTypes {
  SUMMARY_CHART = "SUMMARY_CHART",
  REGION_CHART = "REGION_CHART",
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

export type VisualizationAttributes =
  | SummaryChartAttributes
  | RegionChartAttributes;
