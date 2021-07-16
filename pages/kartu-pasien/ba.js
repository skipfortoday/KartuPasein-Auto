import React, { useEffect } from "react";
import Admin from "../../src/layouts/admin";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getBA } from "../../src/actions/kartu-pasien-action";
import firebase from "../../src/config/firebase";
import { connect } from "react-redux";
import BottomNav from "../../src/layouts/bottomNav";

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
    name: "WaktuSyc",
    options: {
      filter: false,
    },
  },
];

const ba = (props) => {
  useEffect(() => {
    if (!props.getBA) {
      props.dispatch(getBA());
      firebase
        .database()
        .ref("/datapasien")
        .on("value", (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          props.dispatch(getBA());
        });
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getBA}
        title="Kartu Pasien Table BA (Beauty Therapist)"
        columns={columns}
      />
    </>
  );
};

ba.layout = BottomNav;
export default connect(mapStateToProps, null)(ba);
