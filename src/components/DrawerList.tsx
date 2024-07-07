import React from "react";
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
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

export default function DrawerList({ anchor }: { anchor: "left" }) {
  const [ListOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!ListOpen);
  };
  return (
    <Box
      sx={{ width: 280, backgroundColor: "#06061f", height: "100%"}}
      role="presentation"
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          backgroundColor:"#1A2A3A", 
          py:2,
          pl: 2, 

        }}
      >
        <Avatar sx={{ bgcolor: "#428ced", p: 2 }}>TH</Avatar>
        <IconButton>
          <LightModeIcon sx={{ color: "white", fontSize: 30 }} />
        </IconButton>
      </List>

      <List sx={{backgroundColor:"#1A2A3A",  color: "white" }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Tanjin Hossain" />
          {ListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

      </List>
      <List sx={{ color: "white" }}>
        <Collapse in={ListOpen} timeout="auto" unmountOnExit>
          <List sx={{backgroundColor:"#06061f"}} component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
            <Avatar sizes="small" sx={{ bgcolor: "#1ca325",mr:3 }}>TH</Avatar>
            <ListItemText primary="Tanjin Hossain" /> 
            </ListItemButton>
            
            <ListItemButton sx={{ pl: 4 }}>
            <AddIcon sx={{mr:5,color:"#d4d4d4",fontSize:30}} />
            <ListItemText primary="Add Account" /> 
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* <Divider /> */}
      <List sx={{color:"white"}}>
        {['My Profile',"New Group"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <AccountCircleIcon sx={{color:"white"}} /> : null}
                {index === 1 ? <GroupIcon sx={{color:"white"}} /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
