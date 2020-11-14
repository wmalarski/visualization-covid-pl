import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateViewArgument, WorkspaceState, WorkspaceView } from "./types";

const initialState: WorkspaceState = {
  views: [
    {
      layout: {
        i: "summary",
        h: 5,
        w: 5,
        x: 0,
        y: 0,
      },
      props: {
        title: "Summary",
      },
    },
    {
      layout: {
        i: "deaths",
        h: 5,
        w: 5,
        x: 5,
        y: 0,
      },
      props: {
        title: "Deaths",
      },
    },
    {
      layout: {
        i: "regions",
        h: 5,
        w: 5,
        x: 5,
        y: 0,
      },
      props: {
        title: "Regions",
      },
    },
  ],
};

const workspaceReducer = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    addView(
      state: WorkspaceState,
      action: PayloadAction<WorkspaceView>,
    ): WorkspaceState {
      const { payload } = action;
      return { ...state, views: [...state.views, payload] };
    },
    deleteView(
      state: WorkspaceState,
      action: PayloadAction<string>,
    ): WorkspaceState {
      const { payload: id } = action;
      return {
        ...state,
        views: state.views.filter(view => view.layout.i !== id),
      };
    },
    updateViews(
      state: WorkspaceState,
      action: PayloadAction<UpdateViewArgument[]>,
    ): WorkspaceState {
      const { payload: views } = action;
      return {
        ...state,
        views: state.views.map(view => {
          const newView = views.find(a => a.viewId === view.layout.i);
          if (!newView) return view;
          return {
            ...view,
            layout: { ...view.layout, ...(newView.layout ?? {}) },
            props: { ...view.props, ...(newView.props ?? {}) },
          };
        }),
      };
    },
  },
});

export const { addView, deleteView, updateViews } = workspaceReducer.actions;

export default workspaceReducer.reducer;
