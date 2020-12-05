import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../common/store";
import { VisualizationState } from "./types";

export const visualizationSelector = (state: RootState): VisualizationState =>
  state.visualization;

export const visualizationRegionsSelector = createSelector(
  visualizationSelector,
  state => state.regions,
);

export const visualizationTimeRangeSelector = createSelector(
  visualizationSelector,
  state => state.timeRange,
);

export const visualizationSelectedRegionsSelector = createSelector(
  visualizationSelector,
  state => state.selectedRegions,
);

export const visualizationSelectedDatesSelector = createSelector(
  visualizationSelector,
  state => state.selectedDates,
);
