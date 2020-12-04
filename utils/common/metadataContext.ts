import { createContext } from "react";
import { SpreadsheetData } from "./types";

export interface MetadataContextValue {
  githubLink: string;
  data: SpreadsheetData | null;
}

const MetadataContext = createContext<MetadataContextValue>({
  githubLink: "",
  data: null,
});

export default MetadataContext;
