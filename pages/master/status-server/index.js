import React from "react";
import CardServer from "../../../src/components/card-server";
import Admin from "../../../src/layouts/admin";

const StatusServer = () => {
  return (
    <>
      <CardServer />
    </>
  );
};

StatusServer.layout = Admin;
export default StatusServer;
