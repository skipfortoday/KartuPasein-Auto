import React, { useEffect } from "react";
import Admin from "../../src/layouts/admin";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getDokter } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";
import firebase from "../../src/config/firebase";

const mapStateToProps = (state) => {
  return {
    getDokter: state.kartuPasien.getDokter,
  };
};

const columns = [
  {
    name: "IDDokter",
    options: {
      filter: false,
    },
  },
  {
    name: "NamaDokter",
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
    name: "TimeSyc",
    options: {
      filter: false,
    },
  },
];

const Dokter = (props) => {
  useEffect(() => {
    if (!props.getDokter) {
      props.dispatch(getDokter());
      firebase
        .database()
        .ref("/datapasien")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          props.dispatch(getDokter());
        });
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getDokter}
        title="Kartu Pasien Table Dokter"
        columns={columns}
      />
    </>
  );
};

Dokter.layout = Admin;
export default connect(mapStateToProps, null)(Dokter);
