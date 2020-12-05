import Dialog from "@material-ui/core/Dialog";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRootDispatch } from "../../../common/store";
import { addView, updateView } from "../../../workspace/slice";
import { ViewDialogProps, WorkspaceViewConfig } from "../../../workspace/types";
import { VisualizationTypes } from "../../types";
import ViewForm from "../generics/viewForm";

export default function RegionChartDialog(props: ViewDialogProps): JSX.Element {
  const { isOpen, setIsOpen, view } = props;
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const methods = useForm<WorkspaceViewConfig>({
    defaultValues: view?.config || {
      visible: true,
      attributes: {
        type: VisualizationTypes.REGION_CHART,
        cumulative: true,
      },
    },
  });
  const { handleSubmit, register } = methods;

  const dispatch = useRootDispatch();
  const onSubmit = useCallback(
    (config: WorkspaceViewConfig): void => {
      handleClose();
      if (!config) return;
      dispatch(
        view ? updateView({ key: view.layout.i, config }) : addView({ config }),
      );
    },
    [dispatch, handleClose, view],
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
        <input type="hidden" ref={register} name="attributes.cumulative" />
        <ViewForm
          isEdit={!!view}
          methods={methods}
          onCancel={() => setIsOpen(false)}
        />
      </form>
    </Dialog>
  );
}
