import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DrawerList from "./DrawerList";

export default function LeftPaneComponent() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
 

  return (
    <div>
      <React.Fragment key={"left"}>
        {" "}
        <IconButton
          onClick={toggleDrawer("left", true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: "white" }}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
       <DrawerList anchor="left" />
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
