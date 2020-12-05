import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VisualizationState, VisualizationTimeRange } from "./types";

const initialState: VisualizationState = {
  selectedDates: [],
  selectedRegions: [],
};

const visualizationReducer = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    setRegions(
      state: VisualizationState,
      action: PayloadAction<string[]>,
    ): VisualizationState {
      const { payload: regions } = action;
      return { ...state, regions };
    },
    setTimeRange(
      state: VisualizationState,
      action: PayloadAction<VisualizationTimeRange>,
    ): VisualizationState {
      const { payload: timeRange } = action;
      return { ...state, timeRange };
    },
    addSelectedRegion(
      state: VisualizationState,
      action: PayloadAction<string>,
    ): VisualizationState {
      const { payload: region } = action;
      return { ...state, selectedRegions: [...state.selectedRegions, region] };
    },
    removeSelectedRegion(
      state: VisualizationState,
      action: PayloadAction<string>,
    ): VisualizationState {
      const { payload: region } = action;
      return {
        ...state,
        selectedRegions: state.selectedRegions.filter(r => r !== region),
      };
    },
    setSelectedRegions(
      state: VisualizationState,
      action: PayloadAction<string[]>,
    ): VisualizationState {
      const { payload: selectedRegions } = action;
      return { ...state, selectedRegions };
    },
    addSelectedDate(
      state: VisualizationState,
      action: PayloadAction<string>,
    ): VisualizationState {
      const { payload: date } = action;
      return { ...state, selectedDates: [...state.selectedDates, date] };
    },
    removeSelectedDate(
      state: VisualizationState,
      action: PayloadAction<string>,
    ): VisualizationState {
      const { payload: date } = action;
      return {
        ...state,
        selectedDates: state.selectedDates.filter(r => r !== date),
      };
    },
    setSelectedDates(
      state: VisualizationState,
      action: PayloadAction<string[]>,
    ): VisualizationState {
      const { payload: selectedDates } = action;
      return { ...state, selectedDates };
    },
  },
});

export const {
  addSelectedDate,
  addSelectedRegion,
  removeSelectedDate,
  removeSelectedRegion,
  setRegions,
  setSelectedDates,
  setSelectedRegions,
  setTimeRange,
} = visualizationReducer.actions;

export default visualizationReducer.reducer;
