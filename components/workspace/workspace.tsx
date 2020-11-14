import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { workspaceViewsSelector } from "../../utils/workspace/selectors";

export default function Workspace(): JSX.Element {
  // const store = useStore();
  // const state = store.getState();
  const dispatch = useDispatch();

  const state = useSelector(workspaceViewsSelector);

  return (
    <div>
      <p>Workspace</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Button
        onClick={() => {
          // dispatch(increment());
        }}
      >
        Click
      </Button>
    </div>
  );
}
