import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { VisualizationTypes } from "../visualization/types";
import {
  UpdateViewArgument,
  WorkspaceState,
  WorkspaceViewProps,
} from "./types";

const initialState: WorkspaceState = {
  views: [
    {
      layout: {
        i: uuidv4(),
        h: 5,
        w: 5,
        x: 0,
        y: 0,
        static: true,
      },
      config: {
        title: "Summary",
        attributes: {
          type: VisualizationTypes.SUMMARY_CHART,
          cumulative: true,
        },
      },
    },
    {
      layout: {
        i: uuidv4(),
        h: 5,
        w: 5,
        x: 5,
        y: 0,
        static: true,
      },
      config: {
        title: "Deaths",
        attributes: {
          type: VisualizationTypes.SUMMARY_CHART,
          cumulative: false,
        },
      },
    },
    {
      layout: {
        i: uuidv4(),
        h: 5,
        w: 5,
        x: 5,
        y: 0,
        static: true,
      },
      config: {
        title: "Regions",
        attributes: {
          type: VisualizationTypes.REGION_CHART,
          cumulative: false,
        },
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
      action: PayloadAction<WorkspaceViewProps>,
    ): WorkspaceState {
      const { payload } = action;
      return { ...state, views: [...state.views, payload] };
    },
    updateView(
      state: WorkspaceState,
      action: PayloadAction<UpdateViewArgument>,
    ): WorkspaceState {
      const { payload } = action;
      const { key, layout = {}, config = {} } = payload;
      return {
        ...state,
        views: state.views.map(view =>
          view.layout.i !== key
            ? view
            : {
                ...view,
                layout: { ...view.layout, ...layout },
                config: { ...view.config, ...config },
              },
        ),
      };
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
          const newView = views.find(v => v.key === view.layout.i);
          if (!newView) return view;
          const { layout = {}, config = {} } = newView;
          return {
            ...view,
            layout: { ...view.layout, ...layout },
            config: { ...view.config, ...config },
          };
        }),
      };
    },
  },
});

export const {
  addView,
  updateView,
  deleteView,
  updateViews,
} = workspaceReducer.actions;

export default workspaceReducer.reducer;
