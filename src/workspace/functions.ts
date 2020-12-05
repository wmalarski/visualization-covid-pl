import { SpreadsheetData } from "../common/types/types";
import { VisualizationTimeRange } from "../visualization/types";

export function getDefaultRange(
  data: SpreadsheetData | null,
): VisualizationTimeRange {
  return {
    fromDate: "",
    toDate: "",
  };
}
