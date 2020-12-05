import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import type { AppProps /*, AppContext */ } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import theme from "../src/themes/theme";

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Covid Visualization</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
