import React, { PropsWithChildren } from "react";
import MetadataContext, { MetadataContextValue } from "../metadataContext";

export default function MetadataProvider(
  props: PropsWithChildren<MetadataContextValue>,
): JSX.Element {
  const { children, ...other } = props;

  return (
    <MetadataContext.Provider value={other}>
      {children}
    </MetadataContext.Provider>
  );
}
