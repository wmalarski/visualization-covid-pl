import { Container, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary">
          © {new Date().getFullYear()}, Built with{" "}
          <Link href="https://nextjs.org/">NextJS</Link>,{" "}
          <Link href="https://www.typescriptlang.org">Typescript</Link> and{" "}
          <Link href="https://material-ui.com/">@Material-ui</Link>
        </Typography>
      </Container>
    </footer>
  );
}
