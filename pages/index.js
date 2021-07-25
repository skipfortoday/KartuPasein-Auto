import React, { useEffect } from "react";
import BottomNav from "../src/layouts/bottomNav";
import RestStatus from "../src/components/restStatus";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

const Index = () => {
  useEffect(() => {
    io().on("connect", () => {
      console.log(socket.id);
      console.log(socket.connected);
    });
  });
  return (
    <>
      <RestStatus />
    </>
  );
};
Index.layout = BottomNav;
export default Index;
