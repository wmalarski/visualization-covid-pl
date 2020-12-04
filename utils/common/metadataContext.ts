import { createContext } from "react";
import { SpreadsheetInput } from "./input";
import { SpreadsheetData } from "./types";

export interface MetadataContextValue {
  githubLink?: string;
  linkedInLink?: string;
  data: SpreadsheetData | null;
}

export interface MetadataInput {
  githubLink?: string;
  linkedInLink?: string;
  input?: SpreadsheetInput;
}

const MetadataContext = createContext<MetadataContextValue>({
  githubLink: "",
  linkedInLink: "",
  data: null,
});

export default MetadataContext;
