import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";

export interface LayoutProps {
  siteTitle?: string;
  header?: JSX.Element;
  rightHeader?: JSX.Element;
}

export default function Layout(
  props: PropsWithChildren<LayoutProps>,
): JSX.Element {
  const { siteTitle, children, header, rightHeader } = props;

  return (
    <>
      <Header siteTitle={siteTitle} right={rightHeader}>
        {header}
      </Header>
      {children}
      <Footer />
    </>
  );
}
