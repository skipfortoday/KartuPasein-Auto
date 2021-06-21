import React from "react";
import Admin from "../src/layouts/admin";
// import Orders from "../src/components/orders";
// import TableExpand from "../src/components/tableExpand";
import TablefixHeader from "../src/components/tablefixHeader";

export default function Dashboard() {
  return (
    <>
      {/* <Orders /> */}
      {/* <TableExpand /> */}
      <TablefixHeader />
    </>
  );
}

Dashboard.layout = Admin;
