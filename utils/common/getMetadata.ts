import fetch from "isomorphic-unfetch";
import { MetadataContextValue } from "./metadataContext";

export default async function getMetadata(): Promise<MetadataContextValue> {
  const res = await fetch("http://localhost:3000/api/data");
  const spreadsheetData = await res.json();

  return {
    githubLink: process.env.GITHUB_LINK ?? "",
    spreadsheetData,
  };
}
