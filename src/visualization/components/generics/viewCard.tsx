import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import isFunction from "lodash/isFunction";
import React, { Dispatch, SetStateAction } from "react";
import { SizeMe, SizeMeProps } from "react-sizeme";
import { useRootDispatch } from "../../../common/store";
import { updateView } from "../../../workspace/slice";
import { WorkspaceViewProps } from "../../../workspace/types";
import ViewCardActions from "./viewCardActions";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  question: {
    overflow: "auto",
    maxHeight: "100%",
    flexGrow: 1,
  },
}));

export interface ViewCardProps {
  children: ((size: SizeMeProps) => JSX.Element) | JSX.Element;
  actions?: JSX.Element | JSX.Element[] | null;
  toolbar?: JSX.Element | JSX.Element[] | null;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ViewCard(
  props: ViewCardProps & WorkspaceViewProps,
): JSX.Element | null {
  const classes = useStyles();

  const {
    layout,
    config: view,
    children,
    actions,
    toolbar,
    setIsEditOpen,
  } = props;
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
            <ViewCardActions
              config={view}
              layout={layout}
              setIsEditOpen={setIsEditOpen}
            />
          </>
        }
        title={title}
        subheader={subheader}
      />
      <div>{toolbar}</div>
      <SizeMe monitorHeight>
        {({ size }) => (
          <div className={classes.question}>
            <CardContent>
              {isFunction(children) ? children({ size }) : children}
            </CardContent>
          </div>
        )}
      </SizeMe>
    </Card>
  );
}
