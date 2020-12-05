import { Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CodeIcon from "@material-ui/icons/Code";
import GitHubIcon from "@material-ui/icons/GitHub";
import InfoIcon from "@material-ui/icons/Info";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import useMetadata from "../hooks/useMetadata";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  grow: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  appBar: {
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export interface HeaderProps {
  right?: JSX.Element;
  siteTitle?: string;
}

export default function Header(
  props: PropsWithChildren<HeaderProps>,
): JSX.Element {
  const { siteTitle = "Covid Visualization", right, children } = props;
  const classes = useStyles();

  const { githubLink, linkedInLink } = useMetadata();

  return (
    <>
      <AppBar className={classes.appBar} component="header" position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" passHref>
              <Button color="inherit" startIcon={<CodeIcon />} component="a">
                {siteTitle}
              </Button>
            </Link>
          </Typography>
          {children}
          <div className={classes.grow} />
          {right}
          <Link href="/about" passHref>
            <IconButton aria-label="about">
              <InfoIcon />
            </IconButton>
          </Link>
          {linkedInLink && (
            <IconButton
              aria-label="linkedin"
              target="_blank"
              href={linkedInLink}
            >
              <LinkedInIcon />
            </IconButton>
          )}
          {githubLink && (
            <IconButton aria-label="github" target="_blank" href={githubLink}>
              <GitHubIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
}
