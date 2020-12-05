import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useState } from "react";
import { VisualizationTypes } from "../../types";
import RegionChartDialog from "../regionChart/regionChartDialog";
import SummaryChartDialog from "../summaryChart/summaryChartDialog";
import SummaryTableDialog from "../summaryTable/summaryTableDialog";

const visualizationDialogs = {
  [VisualizationTypes.REGION_CHART]: {
    title: "Region Chart",
    dialog: RegionChartDialog,
  },
  [VisualizationTypes.SUMMARY_CHART]: {
    title: "Summary Chart",
    dialog: SummaryChartDialog,
  },
  [VisualizationTypes.SUMMARY_TABLE]: {
    title: "Summary Table",
    dialog: SummaryTableDialog,
  },
};

export default function DialogsMenu(): JSX.Element {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [dialog, setDialog] = useState<VisualizationTypes | null>(null);
  const setIsOpen = useCallback(() => setDialog(null), []);

  return (
    <>
      <Button
        aria-controls="dialogs-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<AddIcon />}
        style={{
          backgroundColor: anchorEl ? theme.palette.primary.light : undefined,
        }}
      >
        Add view
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {Object.entries(visualizationDialogs).map(([key, pair]) => (
          <MenuItem
            key={key}
            onClick={() => {
              setDialog(key as VisualizationTypes);
              handleClose();
            }}
          >
            {pair.title}
          </MenuItem>
        ))}
      </Menu>
      {Object.entries(visualizationDialogs).map(([key, pair]) => (
        <div key={key}>
          {pair.dialog({ isOpen: key === dialog, setIsOpen })}
        </div>
      ))}
    </>
  );
}
