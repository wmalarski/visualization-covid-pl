import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import React from "react";
import { useRootDispatch } from "../../utils/store";
import { deleteView, updateView } from "../../utils/workspace/slice";
import { WorkspaceViewProps } from "../../utils/workspace/types";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  question: {
    overflow: "auto",
    maxHeight: "100%",
  },
}));

export interface WorkspaceCardProps {
  children: JSX.Element | JSX.Element[] | null;
  actions?: JSX.Element | JSX.Element[] | null;
  toolbar?: JSX.Element | JSX.Element[] | null;
}

export default function WorkspaceCard(
  props: WorkspaceCardProps & WorkspaceViewProps,
): JSX.Element | null {
  const classes = useStyles();

  const { layout, config: view, children, actions, toolbar } = props;
  const { title, subheader } = view;
  const { i: key, static: isStatic } = layout;

  const dispatch = useRootDispatch();

  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader
        action={
          <>
            {actions}
            <IconButton
              aria-label="pin"
              onClick={() =>
                dispatch(
                  updateView({
                    key: key,
                    layout: { static: !isStatic },
                  }),
                )
              }
            >
              <DragIndicatorIcon color={isStatic ? "disabled" : "primary"} />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={() => dispatch(deleteView(key))}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
        title={title}
        subheader={subheader}
      />
      <div>{toolbar}</div>
      <div className={classes.question}>
        <CardContent>{children}</CardContent>
      </div>
    </Card>
  );
}
