import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloudDoneRoundedIcon from "@material-ui/icons/CloudDoneRounded";
import CloudOffRoundedIcon from "@material-ui/icons/CloudOffRounded";
import { green, red } from "@material-ui/core/colors";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 400,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    minWidth: 200,
  },
  cover: {
    marginTop: 20,
    width: 180,
    height: 100,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
    color: green[800],
  },
  playIcon2: {
    height: 38,
    width: 38,
    color: red[800],
  },
}));

export default function CardServer() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Jakarta 1
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Jakarta PIK
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="coloud">
                  <CloudDoneRoundedIcon className={classes.playIcon} />
                </IconButton>
                <Typography variant="subtitle2" gutterBottom>
                  Online
                </Typography>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="/ServerUP.svg"
              title="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Jakarta 2
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Jakarta Selatan
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="play/pause">
                  <CloudOffRoundedIcon className={classes.playIcon2} />
                </IconButton>
                <Typography variant="subtitle2" gutterBottom>
                  Offline
                </Typography>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="/ServerDown.svg"
              title="Live from space album cover"
            />
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
}
