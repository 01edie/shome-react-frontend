import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Badge,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { domSensitivePaths, menuList } from "../config/menu-config";
import { useAuth } from "../context/auth-context";
import ExpenseEntry from "../views/expenses/expense-entry";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Sandhyamita Home 2 © &nbsp;{new Date().getFullYear()}
    </Typography>
  );
}

const drawerWidth: number = 220;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,

  transition: domSensitivePaths.includes(window.location.pathname)
    ? "none"
    : theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: domSensitivePaths.includes(window.location.pathname)
      ? "none"
      : theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,

    // test
    // marginTop:64,
    overflow: "hidden",
    // height:'calc(100% - 64px)',

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: domSensitivePaths.includes(window.location.pathname)
        ? 0
        : theme.transitions.duration.enteringScreen,
      // duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: domSensitivePaths.includes(window.location.pathname)
        ? "none"
        : theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            // duration: theme.transitions.duration.leavingScreen,
          }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8),
      },
    }),
  },
}));

// styled badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
    minWidth: "6px !important",
    height: "6px !important",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Layout() {
  // Drawer
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutFromApp, user } = useAuth();
  // ---

  // account menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accountMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ---

  // record entry drawer
  const [recorderOpen, setRecorder] = React.useState(false);

  const toggleRecorder = () => {
    setRecorder((s) => !s);
  };
  // ---

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              display: { xs: "none", sm: "block" },
              ...(open && { visibility: "hidden" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={(theme) => ({
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "cursive",
              [theme.breakpoints.down("sm")]: {
                fontSize: 18,
              },
            })}
          >
            Sandhyamita Home 2
          </Typography>
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              },
            })}
          >
            <Tooltip title="Add Expense">
              <IconButton
                onClick={toggleRecorder}
                size="small"
                style={{ color: "whitesmoke" }}
                id="add-expense"
              >
                <NoteAddIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                // sx={{ position: "absolute", right: 16 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // sx={{boxShadow:2}}
                // color="error"
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  {/* <Avatar src="/zen-logo.png" sx={{ width: 32, height: 32, color: "black"}}/> */}

                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      color: "black",
                      bgcolor: "whitesmoke",
                    }}
                  >
                    <Box component="img" width={24} src="/zen-logo.png" />
                  </Avatar>
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={accountMenuOpen}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  minWidth: 160,
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar
                style={{ width: 24, height: 24, marginRight: 16 }}
                src="/zen-logo.png"
              ></Avatar>
              {user ?? "User"}
            </MenuItem>
            <Divider />

            <MenuItem
              onClick={() => {
                navigate("/app/settings");
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                logoutFromApp();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List
          component="nav"
          sx={{
            height: "calc(100vh - 64px - 10px)",
            overflowX: "hidden",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {menuList.map((e) => (
            <ListItemButton
              sx={{
                borderRight: location.pathname.startsWith(e.path)
                  ? "blue 3px solid"
                  : "none",
                backgroundColor: location.pathname.startsWith(e.path)
                  ? "#e4e8f8"
                  : "inherit",
              }}
              onClick={() => navigate(e.path)}
              key={e.name}
            >
              <ListItemIcon sx={{ minWidth: 48 }}>{<e.icon />}</ListItemIcon>
              <ListItemText primary={e.name} />
            </ListItemButton>
          ))}
          <Divider sx={{ my: 1 }} />
          {/* {secondaryListItems} */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth={false}
          sx={{
            mt: 4,
            mb: 2,
            // mx:0
          }}
        >
          <Box minHeight="calc(100vh - 64px - 48px - 48px)" position="relative">
            <Outlet />
            {/* <IconButton
                onClick={toggleRecorder}
                size="large"
                color="primary"
                style={{ position: "fixed", right: 60, bottom: 40 }}
              >
                <NoteAddIcon fontSize="large" />
              </IconButton> */}
            <MuiDrawer
              open={recorderOpen}
              anchor="right"
              onClose={() => setRecorder(false)}
            >
              <Toolbar />
              <ExpenseEntry onClose={() => setRecorder(false)} />
            </MuiDrawer>
          </Box>
          <Copyright sx={{ pt: 3 }} />
        </Container>
      </Box>
    </Box>
  );
}
