import React, { useContext } from "react";
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
import LightModeIcon from "@mui/icons-material/LightMode";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import CallIcon from "@mui/icons-material/Call";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { ThemeContext } from "./ThemeContext";

export default function DrawerList({ anchor }: { anchor: "left" }) {
  const [ListOpen, setOpen] = React.useState(false);

  const { themeMode, toggleTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setOpen(!ListOpen);
  };
  return (
    <Box
      sx={{ width: 280, backgroundColor: "#06061f", height: "100%" }}
      role="presentation"
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          backgroundColor: "#1A2A3A",
          py: 2,
          pl: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "#428ced", p: 2, color: "white" }}>TH</Avatar>
        <IconButton>
          <LightModeIcon
            onClick={toggleTheme}
            sx={{ color: "white", fontSize: 30 }}
          />
        </IconButton>
      </List>

      <List sx={{ backgroundColor: "#1A2A3A", color: "white", p: 0, m: 0 }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText
            primary={
              <span>
                Tanjin Hossain <br />{" "}
                <span style={{ fontSize: 12, color: "lightgray" }}>
                  +8801861557343
                </span>
              </span>
            }
          />
          {ListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </List>
      <List sx={{ color: "white" }}>
        <Collapse in={ListOpen} timeout="auto" unmountOnExit>
          <List
            sx={{ backgroundColor: "#06061f" }}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ pl: 4 }}>
              <Avatar
                sizes="small"
                sx={{ bgcolor: "#1ca325", mr: 3, color: "white" }}
              >
                TH
              </Avatar>
              <ListItemText primary="Tanjin Hossain" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <AddIcon sx={{ mr: 5, color: "#d4d4d4", fontSize: 30 }} />
              <ListItemText primary="Add Account" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* <Divider /> */}
      <List sx={{ color: "white" }}>
        {[
          "My Profile",
          "New Group",
          "Contacts",
          "Calls",
          "People Nearby",
          "Saved Messages",
          "settings",
          "Invite Friends",
        ].map((text, index) => (
          <ListItem sx={{ mb: index === 0 ? 3 : 0 }} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <AccountCircleIcon sx={{ color: "white" }} />
                ) : null}
                {index === 1 ? <GroupIcon sx={{ color: "white" }} /> : null}
                {index === 2 ? (
                  <ContactPageIcon sx={{ color: "white" }} />
                ) : null}
                {index === 3 ? <CallIcon sx={{ color: "white" }} /> : null}
                {index === 4 ? <RunCircleIcon sx={{ color: "white" }} /> : null}
                {index === 5 ? <BookmarkIcon sx={{ color: "white" }} /> : null}
                {index === 6 ? <SettingsIcon sx={{ color: "white" }} /> : null}
                {index === 7 ? <GroupAddIcon sx={{ color: "white" }} /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
