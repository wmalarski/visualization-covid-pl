import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { Dispatch, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRootDispatch } from "../../utils/store";
import { VisualizationTypes } from "../../utils/visualization/types";
import { addView } from "../../utils/workspace/slice";

export interface WorkspaceViewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkspaceViewDialog(
  props: WorkspaceViewDialogProps,
): JSX.Element {
  const { isOpen, setIsOpen } = props;

  const dispatch = useRootDispatch();
  // const views = useSelector(workspaceViewsSelector);
  // const names = useMemo(() => views.map(view => view.config.title), [views]);

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch(
            addView({
              config: {
                title: "aa",
                attributes: {
                  type: VisualizationTypes.REGION_CHART,
                  cumulative: false,
                },
              },
              layout: {
                h: 6,
                i: uuidv4(),
                w: 6,
                x: 0,
                y: 0,
              },
            }),
          );
          handleClose();
        }}
      >
        <DialogTitle id="form-dialog-title">Add View</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="View Title"
            required={true}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CancelIcon />} onClick={handleClose}>
            Cancel
          </Button>
          <Button startIcon={<AddIcon />} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
