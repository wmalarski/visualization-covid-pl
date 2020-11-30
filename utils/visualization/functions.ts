import { SpreadsheetData } from "../common/types";
import { VisualizationTimeRange } from "./types";

export function getDefaultRange(data: SpreadsheetData): VisualizationTimeRange {
  return {
    fromDate: "",
    toDate: "",
  };
}
