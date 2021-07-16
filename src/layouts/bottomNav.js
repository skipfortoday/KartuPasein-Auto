import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import SettingsIcon from "@material-ui/icons/Settings";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppsIcon from "@material-ui/icons/Apps";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    boxShadow: "0 -6px 6px 0 rgba(0,0,0,.1)",
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
    marginTop: 55,
    marginBottom: 50,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function BottomNav({ children }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.conten}>
      <div className={classes.appBar}>
        <AppBar position="fixed">
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
              App Syc Client
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.isi}>{children}</div>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Home"
          value="recents"
          icon={<AppsIcon />}
        />
        <BottomNavigationAction
          label="Log"
          value="favorites"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Setting"
          value="nearby"
          icon={<SettingsIcon />}
          //   onClick={() => router.push("/kartu-pasien/ba")}
        />
      </BottomNavigation>
    </div>
  );
}
