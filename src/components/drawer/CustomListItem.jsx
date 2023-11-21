import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomListItem = ({ text, icon, to, open }) => {
  console.log(to, "to");
  const navigate = useNavigate();
  return (
    <ListItem
      onClick={() => {
        navigate(to);
      }}
      disablePadding
      sx={{ display: "block" }}
      className={`menu-item ${window.location.pathname === to ? "active" : ""}`}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            color: window.location.pathname === to ? "white" : "#a555f3",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default CustomListItem;
