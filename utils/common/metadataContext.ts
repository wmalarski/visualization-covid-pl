import { createContext } from "react";
import { SpreadsheetData } from "../loader/types";

export interface MetadataContextValue {
  githubLink: string;
  spreadsheetId: string;
  spreadsheetData: SpreadsheetData | null;
}

const MetadataContext = createContext<MetadataContextValue>({
  githubLink: "",
  spreadsheetId: "",
  spreadsheetData: null,
});

export default MetadataContext;
