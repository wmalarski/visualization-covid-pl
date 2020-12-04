import { GetStaticProps } from "next";
import React from "react";
import { Provider } from "react-redux";
import MetadataProvider from "../components/common/metadataProvider";
import Workspace from "../components/workspace/workspace";
import getData from "../utils/common/getData";
import getInput from "../utils/common/getInput";
import { SpreadsheetInput } from "../utils/common/input";
import store from "../utils/store";
export interface HomeProps {
  githubLink: string;
  input: SpreadsheetInput;
}

export default function Home(props: HomeProps): JSX.Element {
  const { input, ...other } = props;
  const data = getData(input);

  return (
    <MetadataProvider data={data} {...other}>
      <Provider store={store}>
        <Workspace />
      </Provider>
    </MetadataProvider>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      githubLink: process.env.GITHUB_LINK ?? "",
      input: await getInput(),
    },
  };
};
