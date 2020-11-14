import { useContext } from "react";
import MetadataContext, { MetadataContextValue } from "./metadataContext";

export default function useMetadata(): MetadataContextValue {
  return useContext(MetadataContext);
}
