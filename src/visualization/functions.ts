import { SpreadsheetData } from "../common/types/types";
import { VisualizationTimeRange } from "./types";

export function getDefaultRange(data: SpreadsheetData): VisualizationTimeRange {
  return {
    fromDate: "",
    toDate: "",
  };
}
