import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover/Popover";
import useTheme from "@material-ui/core/styles/useTheme";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import VisualizationController from "./visualizationController";

export default function ControllerPopover(): JSX.Element {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isFiltersOpen = !!anchorEl;

  return (
    <>
      <Button
        startIcon={<SearchIcon />}
        onClick={event => setAnchorEl(event.currentTarget)}
        style={{
          backgroundColor: isFiltersOpen
            ? theme.palette.primary.light
            : undefined,
        }}
      >
        Filters
      </Button>
      <Popover
        id={isFiltersOpen ? "controller-popover" : undefined}
        open={isFiltersOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <VisualizationController />
      </Popover>
    </>
  );
}
