import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";

export interface LayoutProps {
  siteTitle?: string;
  header?: JSX.Element;
}

export default function Layout(
  props: PropsWithChildren<LayoutProps>,
): JSX.Element {
  const { siteTitle, children, header } = props;

  return (
    <>
      <Header siteTitle={siteTitle}>{header}</Header>
      {children}
      <Footer />
    </>
  );
}
