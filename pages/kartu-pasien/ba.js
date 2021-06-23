import React, { useEffect } from "react";
import Admin from "../../src/layouts/admin";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getBA } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getBA: state.kartuPasien.getBA,
  };
};

const columns = [
  {
    name: "IDBA",
    options: {
      filter: false,
    },
  },
  {
    name: "NamaBA",
    options: {
      filter: false,
    },
  },
  {
    name: "Status",
    options: {
      filter: false,
    },
  },
  {
    name: "TglAuto",
    options: {
      filter: false,
    },
  },
];

const ba = (props) => {
  useEffect(() => {
    if (!props.getBA) {
      props.dispatch(getBA());
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getBA}
        title="Kartu Pasien Table BA"
        columns={columns}
      />
    </>
  );
};

ba.layout = Admin;
export default connect(mapStateToProps, null)(ba);
