import Dialog from "@material-ui/core/Dialog";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRootDispatch } from "../../../common/store";
import { addView } from "../../../workspace/slice";
import { WorkspaceViewConfig } from "../../../workspace/types";
import { VisualizationDialogProps, VisualizationTypes } from "../../types";
import ViewForm from "../generics/viewForm";

export default function SummaryTableDialog(
  props: VisualizationDialogProps,
): JSX.Element {
  const { isOpen, setIsOpen } = props;
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const methods = useForm<WorkspaceViewConfig>({
    defaultValues: {
      visible: true,
      attributes: {
        type: VisualizationTypes.SUMMARY_TABLE,
      },
    },
  });
  const { handleSubmit, register } = methods;

  const dispatch = useRootDispatch();
  const onSubmit = useCallback(
    (config: WorkspaceViewConfig): void => {
      handleClose();
      if (!config) return;
      dispatch(addView({ config }));
    },
    [dispatch, handleClose],
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" ref={register} name="visible" />
        <input type="hidden" ref={register} name="attributes.type" />
        <ViewForm methods={methods} onCancel={() => setIsOpen(false)}>
          <p>REGION_CHART</p>
        </ViewForm>
      </form>
    </Dialog>
  );
}
