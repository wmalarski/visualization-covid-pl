import { MetadataContextValue } from "./metadataContext";

export default function getMetadata(): MetadataContextValue {
  return {
    githubLink: process.env.GITHUB_LINK ?? "",
  };
}
