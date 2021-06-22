import React from "react";
import MUIDataTable from "mui-datatables";
import Skeleton from "@material-ui/lab/Skeleton";

const TablefixHeader = (props) => {
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyHeight: "400px",
  };
  const data = props.data ? props.data : [];
  return props.data ? (
    <MUIDataTable
      title={props.title}
      data={data}
      columns={props.columns}
      options={options}
    />
  ) : (
    <>
      <Skeleton variant="text" height={100} animation={"wave"} />
      <Skeleton variant="rect" height={420} animation={"wave"} />
    </>
  );
};

export default TablefixHeader;
