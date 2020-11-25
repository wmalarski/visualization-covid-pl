import { GetStaticProps } from "next";
import React from "react";
import { Provider } from "react-redux";
import MetadataProvider from "../components/common/metadataProvider";
import Workspace from "../components/workspace/workspace";
import getMetadata from "../utils/common/getMetadata";
import { MetadataContextValue } from "../utils/common/metadataContext";
import store from "../utils/store";
export interface HomeProps {
  metadata: MetadataContextValue;
}

export default function Home(props: HomeProps): JSX.Element {
  const { metadata } = props;

  return (
    <MetadataProvider {...metadata}>
      <Provider store={store}>
        <Workspace />
      </Provider>
    </MetadataProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: await getMetadata(),
    },
  };
};
