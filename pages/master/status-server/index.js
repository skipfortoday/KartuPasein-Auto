import React from "react";
import CardServer from "../../../src/components/card-server";
import BottomNav from "../../../src/layouts/bottomNav";
import { Grid } from "@material-ui/core/";

const StatusServer = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <CardServer Nama="Jakarta 1" Lokasi="JK1-PIK" Status="Online" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardServer Nama="Jakarta 2" Lokasi="JK2-SIMPRUG" Status="Online" />
        </Grid>
      </Grid>
    </>
  );
};

StatusServer.layout = BottomNav;
export default StatusServer;
