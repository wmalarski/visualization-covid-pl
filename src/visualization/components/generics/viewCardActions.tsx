import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MinimizeIcon from "@material-ui/icons/Minimize";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { useRootDispatch } from "../../../common/store";
import {
  copyView,
  deleteView,
  toggleViewVisibility,
} from "../../../workspace/slice";
import { WorkspaceViewProps } from "../../../workspace/types";

export default function ViewCardActions(
  props: WorkspaceViewProps,
): JSX.Element {
  const { layout } = props;
  const { i: key } = layout;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const dispatch = useRootDispatch();

  return (
    <>
      <IconButton
        aria-controls="actions-menu-button"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions-menu"
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
        <MenuItem onClick={() => dispatch(copyView(key))}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Copy" />
        </MenuItem>
        <MenuItem onClick={() => dispatch(deleteView(key))}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={() => dispatch(toggleViewVisibility(key))}>
          <ListItemIcon>
            <MinimizeIcon />
          </ListItemIcon>
          <ListItemText primary="Hide" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(deleteView(key))}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
}
