import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { VisualizationTypes } from "../visualization/types";
import { UpdateViewArgument, WorkspaceState, WorkspaceViewArgs } from "./types";

const defaultLayoutProps = {
  static: true,
  minW: 3,
  minH: 2,
};

const initialState: WorkspaceState = {
  views: [
    {
      layout: {
        i: uuidv4(),
        h: 5,
        w: 5,
        x: 0,
        y: 0,
        ...defaultLayoutProps,
      },
      config: {
        title: "Summary",
        visible: true,
        attributes: {
          type: VisualizationTypes.SUMMARY_TABLE,
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
        ...defaultLayoutProps,
      },
      config: {
        title: "Deaths",
        visible: true,
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
        ...defaultLayoutProps,
      },
      config: {
        title: "Regions",
        visible: true,
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
      action: PayloadAction<WorkspaceViewArgs>,
    ): WorkspaceState {
      const { payload } = action;
      const { layout = {} } = payload;
      return {
        ...state,
        views: [
          ...state.views,
          {
            ...payload,
            layout: {
              h: 6,
              i: uuidv4(),
              w: 6,
              x: 0,
              y: 0,
              ...defaultLayoutProps,
              ...layout,
            },
          },
        ],
      };
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
    toggleViewVisibility(
      state: WorkspaceState,
      action: PayloadAction<string>,
    ): WorkspaceState {
      const { payload: id } = action;
      return {
        ...state,
        views: state.views.map(view =>
          view.layout.i !== id
            ? view
            : {
                ...view,
                config: { ...view.config, visible: !view.config.visible },
              },
        ),
      };
    },
    copyView(
      state: WorkspaceState,
      action: PayloadAction<string>,
    ): WorkspaceState {
      const { payload: id } = action;
      return {
        ...state,
        views: state.views.flatMap(view =>
          view.layout.i !== id
            ? [view]
            : [
                view,
                {
                  ...view,
                  layout: { ...view.layout, i: uuidv4() },
                },
              ],
        ),
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
  copyView,
  updateView,
  deleteView,
  updateViews,
  toggleViewVisibility,
} = workspaceReducer.actions;

export default workspaceReducer.reducer;
