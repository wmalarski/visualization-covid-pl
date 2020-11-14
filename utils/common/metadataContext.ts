import { createContext } from "react";

export interface MetadataContextValue {
  githubLink: string;
}

const MetadataContext = createContext<MetadataContextValue>({
  githubLink: "",
});

export default MetadataContext;
