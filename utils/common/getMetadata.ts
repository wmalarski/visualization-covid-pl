import loadSpreadsheet from "../loader/loadSpreadsheet";
import { MetadataContextValue } from "./metadataContext";

export default async function getMetadata(): Promise<MetadataContextValue> {
  const spreadsheetId = process.env.SPREADSHEET_ID ?? "";
  const spreadsheetData = await loadSpreadsheet(spreadsheetId);
  return {
    spreadsheetId,
    githubLink: process.env.GITHUB_LINK ?? "",
    spreadsheetData,
  };
}
