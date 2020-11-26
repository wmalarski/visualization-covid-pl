import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { PropsWithChildren } from "react";
import { UseFormMethods } from "react-hook-form";
import { WorkspaceViewConfig } from "../../utils/workspace/types";

export interface ViewFormProps {
  methods: UseFormMethods<WorkspaceViewConfig>;
  onCancel: () => void;
}

export default function ViewForm(
  props: PropsWithChildren<ViewFormProps>,
): JSX.Element {
  const { children, methods, onCancel } = props;
  const { register } = methods;

  return (
    <>
      <DialogContent>
        <DialogTitle id="form-dialog-title">Add View</DialogTitle>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          inputRef={register}
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="View Title"
          required={true}
          fullWidth
        />
        <TextField
          inputRef={register}
          margin="dense"
          id="subheader"
          name="subheader"
          label="Subtitle"
          fullWidth
        />
        {children}
      </DialogContent>
      <DialogActions>
        <Button startIcon={<CancelIcon />} onClick={onCancel}>
          Cancel
        </Button>
        <Button startIcon={<AddIcon />} type="submit">
          Add
        </Button>
      </DialogActions>
    </>
  );
}
