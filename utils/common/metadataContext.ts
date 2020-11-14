import { createContext } from "react";
import { SpreadsheetData } from "./types";

export interface MetadataContextValue {
  githubLink: string;
  spreadsheetData: SpreadsheetData | null;
}

const MetadataContext = createContext<MetadataContextValue>({
  githubLink: "",
  spreadsheetData: null,
});

export default MetadataContext;
