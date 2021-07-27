import React, { useState, useEffect } from "react";
import CardServer from "../../../src/components/card-server";
import BottomNav from "../../../src/layouts/bottomNav";
import { Grid } from "@material-ui/core/";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

const StatusServer = () => {
  const [isOnline, setIsOnline] = useState(null);
  socket.on("connect", () => {
    socket.on("some event", (msg) => {
      handleStatusChange(msg.list);
    });
  });

  function handleStatusChange(data) {
    setIsOnline(data);
  }

  function cariParam(param) {
    let data =
      isOnline == null
        ? "Offline"
        : isOnline.find((element) => element == param);
    let finalData = data == undefined ? "Offline" : "Online";
    return finalData;
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <CardServer
            Nama="Jakarta 1"
            Lokasi="JK1-PIK"
            Status={cariParam("192.168.0.27")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardServer
            Nama="Jakarta 2"
            Lokasi="JK2-SIMPRUG"
            Status={cariParam("127.0.0.1")}
          />
        </Grid>
      </Grid>
    </>
  );
};

StatusServer.layout = BottomNav;
export default StatusServer;
