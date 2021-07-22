import React, { useEffect } from "react";
import BottomNav from "../../src/layouts/bottomNav";
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
    name: "Flag",
    options: {
      filter: false,
    },
  },
  {
    name: "Waktu",
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

LokasiFotoAfter.layout = BottomNav;
export default connect(mapStateToProps, null)(LokasiFotoAfter);
