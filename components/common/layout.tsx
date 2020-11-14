import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";

export interface LayoutProps {
  siteTitle?: string;
}

export default function Layout(
  props: PropsWithChildren<LayoutProps>,
): JSX.Element {
  const { siteTitle, children } = props;

  return (
    <>
      <Header siteTitle={siteTitle} />
      {children}
      <Footer />
    </>
  );
}
