import * as React from "react";
import logo from "../assets/logo.png";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { resetProfile } from "../../redux/features/auth";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import "./style.css";
import CustomListItem from "./CustomListItem";
import {
  Create,
  FeaturedPlayList,
  FormatListNumbered,
  HomeOutlined,
  InfoOutlined,
  Person2Outlined,
  Person3Sharp,
} from "@mui/icons-material";
import { PrivatePath, PublicPath } from "../../constants/routes.c";
import useCapitalizeFirstLetter from "../hooks/useCapitalizeFirstLetter";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: "#ffffff",
  color: "#a555f3",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const { firstName } = useSelector((store) => store.auth.profile);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="drawer-header">
            <Typography variant="h6" noWrap component="div">
              <p style={{ color: "black", marginTop: "1rem" }}>
                {" "}
                Welcome Back{" "}
                <span style={{ color: "#a555f3" }}>
                  {useCapitalizeFirstLetter(firstName)}
                </span>
                , to Holiday Hakk
              </p>
            </Typography>
            {/* header  */}
            <div className="right-heading-section">
              {/* <Profile /> */}
              <Button
                className="logout"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(resetProfile());
                  navigate(PublicPath.login);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img style={{ width: "11rem" }} src={logo} alt="logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "Home",
              icon: <HomeOutlined />,
              to: PrivatePath.home,
            },

            // {
            //   text: "Announcement",
            //   icon: <InfoOutlined />,
            //   to: PrivatePath.announcement,
            // },
            // {
            //   text: "Profile",
            //   icon: <Person2Outlined />,
            //   to: PrivatePath.profile,
            // },
            {
              text: "CreateEmployee",
              icon: <Person3Sharp />,
              to: PrivatePath["create-employee"],
            },
            {
              text: "Employees",
              icon: <FormatListNumbered />,
              to: PrivatePath.employees,
            },
            {
              text: "Create Leave",
              icon: <Create />,
              to: PrivatePath["create-leave"],
            },
            {
              text: "Leaves List",
              icon: <FeaturedPlayList />,
              to: PrivatePath.leaves,
            },
            //   "Leave Management","Announcements","Employee Details","History"
          ].map(({ icon, text, to }, index) => (
            <CustomListItem
              icon={icon}
              text={text}
              key={index}
              to={to}
              open={open}
            />
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
