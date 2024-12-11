import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from "@mui/material";
import {
  Dashboard,
  People,
  Engineering,
  Settings,
  ExitToApp,
  Category
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Users", icon: <People />, path: "/users" },
    {
      text: "Service Providers",
      icon: <Engineering />,
      path: "/helpers"
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)"
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor:
                location.pathname === item.path
                  ? "primary.light"
                  : "transparent",
              "&:hover": {
                backgroundColor: "primary.light"
              }
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItem
          button
          onClick={() => {
            dispatch(logout()); // Replace with actual logout action
            persistor.purge();
            navigate("/");
          }}
          sx={{
            "&:hover": {
              backgroundColor: "primary.light"
            }
          }}
        >
          <ListItemIcon sx={{ color: "primary.main" }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
