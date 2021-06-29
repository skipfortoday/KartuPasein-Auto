import React, { useEffect } from "react";
import Admin from "../../src/layouts/admin";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getDokter } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";
import firebase from "../../src/config/firebase";

// console.log(firebase.name);
// console.log(fconn.ref("/user")
// //   .on("value", (snapshot) => {
// //     const data = snapshot.val();
// //     console.log(data);
// // //   });;

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
    name: "TglAuto",
    options: {
      filter: false,
    },
  },
];

const Dokter = (props) => {
  // console.log(datahm);

  // const dbRef = firebase.database().ref();
  // // console.log(dbRef.child("datapasien").get());
  // dbRef
  //   .child("datapasien")
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // // console.log(datahm, "asu");
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
