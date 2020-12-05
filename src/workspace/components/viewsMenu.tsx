import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import CloseIcon from "@material-ui/icons/Close";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRootDispatch } from "../../common/store";
import { workspaceViewsSelector } from "../selectors";
import { deleteView, toggleViewVisibility } from "../slice";

export default function ViewsMenu(): JSX.Element {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const dispatch = useRootDispatch();
  const views = useSelector(workspaceViewsSelector);

  return (
    <>
      <Button
        aria-controls="views-menu-button"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<EqualizerIcon />}
        style={{
          backgroundColor: anchorEl ? theme.palette.primary.light : undefined,
        }}
      >
        Views
      </Button>
      <Menu
        id="views-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={!!anchorEl}
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
        {views.map(view => (
          <MenuItem
            key={view.layout.i}
            selected={view.config.visible}
            onClick={() => dispatch(toggleViewVisibility(view.layout.i))}
          >
            <ListItemText
              primary={view.config.title}
              secondary={view.config.subheader}
            />
            <ListItemSecondaryAction>
              <IconButton
                size="small"
                edge="end"
                aria-label="close"
                onClick={() => dispatch(deleteView(view.layout.i))}
              >
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
