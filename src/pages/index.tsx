import { GetStaticProps } from "next";
import React from "react";
import { Provider } from "react-redux";
import MetadataProvider from "../common/components/metadataProvider";
import getData from "../common/functions/getData";
import getInput from "../common/functions/getInput";
import { MetadataInput } from "../common/metadataContext";
import store from "../common/store";
import Workspace from "../workspace/components/workspace";
export interface HomeProps {
  metadata: MetadataInput;
}

export default function Home(props: HomeProps): JSX.Element {
  const { input, ...other } = props.metadata;
  const data = input && getData(input);

  return (
    <MetadataProvider data={data ?? null} {...other}>
      <Provider store={store}>
        <Workspace />
      </Provider>
    </MetadataProvider>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      metadata: {
        githubLink: process.env.GITHUB_LINK,
        linkedInLink: process.env.LINKED_IN_LINK,
        input: await getInput(),
      },
    },
  };
};
