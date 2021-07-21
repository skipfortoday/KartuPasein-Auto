import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useRouter } from "next/router";
import SettingsIcon from "@material-ui/icons/Settings";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppsIcon from "@material-ui/icons/Apps";
import StorageIcon from "@material-ui/icons/Storage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  conten: {
    overflowX: "hidden",
    overflowY: "hidden",
  },
  appBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  isi: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function BottomNav({ children }) {
  const router = useRouter();
  const classes = useStyles();
  const [value, setValue] = React.useState("Data");
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  useEffect(() => {
    if (router.pathname == "/") {
      setValue("Home");
    } else if (router.pathname == "/setting") {
      setValue("Setting");
    } else {
      setValue("Data");
    }
  });
  return (
    <div className={classes.conten}>
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Rest Server
            </Typography>
            <Button color="inherit">Online</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.isi}>{children}</div>
      <BottomNavigation
        value={value}
        // onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          value="Home"
          onClick={() => router.push("/")}
          icon={<AppsIcon />}
        />
        <BottomNavigationAction
          label="Data"
          value="Data"
          onClick={() => router.push("/master/status-server")}
          icon={<StorageIcon />}
        />
        <BottomNavigationAction
          label="Setting"
          value="Setting"
          onClick={() => router.push("/setting")}
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
