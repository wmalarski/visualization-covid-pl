import fetch from "isomorphic-unfetch";
import { SpreadsheetInput } from "../types/input";

export default async function getInput(): Promise<SpreadsheetInput> {
  const res = await fetch("http://localhost:3000/api/data");
  const result = await res.json();
  return SpreadsheetInput.encode(result);
}
