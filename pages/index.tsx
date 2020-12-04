import { GetStaticProps } from "next";
import React from "react";
import { Provider } from "react-redux";
import MetadataProvider from "../components/common/metadataProvider";
import Workspace from "../components/workspace/workspace";
import getData from "../utils/common/functions/getData";
import getInput from "../utils/common/functions/getInput";
import { MetadataInput } from "../utils/common/metadataContext";
import store from "../utils/common/store";
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
