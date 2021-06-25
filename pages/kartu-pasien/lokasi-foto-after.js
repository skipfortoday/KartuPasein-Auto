import React, { useEffect } from "react";
import Admin from "../../src/layouts/admin";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getLokasiFotoAfter } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getLokasiFotoAfter: state.kartuPasien.getLokasiFotoAfter,
  };
};

const columns = [
  {
    name: "NoAuto",
    options: {
      filter: false,
    },
  },
  {
    name: "LokasiFotoAfter",
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

const LokasiFotoAfter = (props) => {
  useEffect(() => {
    if (!props.getLokasiFotoAfter) {
      props.dispatch(getLokasiFotoAfter());
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getLokasiFotoAfter}
        title="Kartu Pasien Table Lokasi Foto After"
        columns={columns}
      />
    </>
  );
};

LokasiFotoAfter.layout = Admin;
export default connect(mapStateToProps, null)(LokasiFotoAfter);
