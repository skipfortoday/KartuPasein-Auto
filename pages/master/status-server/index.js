import React, { useState, useEffect } from "react";
import CardServer from "../../../src/components/card-server";
import BottomNav from "../../../src/layouts/bottomNav";
import { Grid } from "@material-ui/core/";
import io from "socket.io-client";
import Slide from "@material-ui/core/Slide";

const StatusServer = () => {
  const [isOnline, setIsOnline] = useState([]);
  const [isOnline1, setIsOnline1] = useState("Off");
  const [isOnline2, setIsOnline2] = useState("Off");
  const [render, setRender] = useState(true);

  function handleStatusChange(data) {
    setIsOnline(data);
  }

  function cariParam1() {
    let data = isOnline.find((element) => element == "127.0.0.1");
    let finalData = data == undefined ? "Offline" : "Online";
    setIsOnline1(finalData);
    return finalData;
  }

  function cariParam2() {
    let data = isOnline.find((element) => element == "192.168.0.14");
    let finalData = data == undefined ? "Offline" : "Online";
    setIsOnline2(finalData);
    return finalData;
  }

  useEffect(() => {
    if (render == true) {
      const socket = io("http://192.168.0.25:3000");
      socket.on("connect", () => {
        socket.on("some event", (msg) => {
          msg.list
            ? handleStatusChange(msg.list)
            : console.log("Hmm Something with Socket");
          console.log(msg);
        });
        setRender(false);
      });
    }
    cariParam1();
    cariParam2();
  });

  return (
    <>
      <Slide in direction="right" mountOnEnter unmountOnExit>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <CardServer Nama="Febri" Lokasi="JK1-PIK" Status={isOnline1} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardServer Nama="Dimas" Lokasi="JK2-SIMPRUG" Status={isOnline2} />
          </Grid>
        </Grid>
      </Slide>
    </>
  );
};

StatusServer.layout = BottomNav;
export default StatusServer;
