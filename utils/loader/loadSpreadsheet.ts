import { GoogleSpreadsheet } from "google-spreadsheet";
import { SpreadsheetData } from "./types";

export default async function loadSpreadsheet(
  spreadsheetId: string,
): Promise<SpreadsheetData | null> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  const doc = new GoogleSpreadsheet(spreadsheetId);
  doc.useApiKey(apiKey);
  try {
    await doc.loadInfo();
    console.log(doc.title);
    console.log("link", doc);
  } catch (error) {
    console.log("sss");
    console.log(error);
  }

  return {
    data: "test123",
  };
}
