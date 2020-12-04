import { GetStaticProps } from "next";
import React from "react";
import Layout from "../components/common/layout";
import MetadataProvider from "../components/common/metadataProvider";
import { MetadataInput } from "../utils/common/metadataContext";
export interface HomeProps {
  metadata: MetadataInput;
}

export default function Home(props: HomeProps): JSX.Element {
  return (
    <MetadataProvider data={null} {...props.metadata}>
      <Layout>
        <p>AAA</p>
      </Layout>
    </MetadataProvider>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      metadata: {
        githubLink: process.env.GITHUB_LINK,
        linkedInLink: process.env.LINKED_IN_LINK,
      },
    },
  };
};
