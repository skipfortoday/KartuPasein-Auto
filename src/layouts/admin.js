import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import BackButton from "../components/backbutton";
import { AccountBox } from "@material-ui/icons";
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import PermMediaRoundedIcon from "@material-ui/icons/PermMediaRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HotelRounded from "@material-ui/icons/HotelRounded";
import BurstModeRoundedIcon from "@material-ui/icons/BurstModeRounded";
import HowToRegRoundedIcon from "@material-ui/icons/HowToRegRounded";
import Collapse from "@material-ui/core/Collapse";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer({ children }) {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openKartuPasien, setOpenKartuPasien] = React.useState(true);

  const handleClick = () => {
    setOpenKartuPasien(!openKartuPasien);
    console.log(openKartuPasien);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <BackButton />
          <Typography variant="h6" noWrap>
            Lvior's System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Kartu Pasien" />
            {openKartuPasien ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openKartuPasien} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => router.push("/kartu-pasien/data-pasien")}
              >
                <ListItemIcon>
                  <SupervisedUserCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Data Pasien" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => router.push("/kartu-pasien/perawatan")}
              >
                <ListItemIcon>
                  <HotelRounded />
                </ListItemIcon>
                <ListItemText primary="Perawatan" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => router.push("/kartu-pasien/dokter")}
              >
                <ListItemIcon>
                  <AssignmentIndRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Dokter" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => router.push("/kartu-pasien/ba")}
              >
                <ListItemIcon>
                  <HowToRegRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Beauty Terapist  " />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => router.push("/kartu-pasien/lokasi-foto-before")}
              >
                <ListItemIcon>
                  <BurstModeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Lokasi Foto Before" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <PermMediaRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Lokasi Foto After" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
