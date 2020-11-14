import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/common/layout";
import MetadataProvider from "../components/common/metadataProvider";
import getMetadata from "../utils/common/getMetadata";
import { MetadataContextValue } from "../utils/common/metadataContext";

export interface HomeProps {
  metadata: MetadataContextValue;
}

export default function Home(props: HomeProps): JSX.Element {
  const { metadata } = props;

  return (
    <MetadataProvider {...metadata}>
      <Layout>
        <p>Hello</p>
      </Layout>
    </MetadataProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metadata: getMetadata(),
    },
  };
};
