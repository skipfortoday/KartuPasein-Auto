import React, { useEffect } from "react";
import Admin from "../src/layouts/admin";
import TablefixHeader from "../src/components/tablefixHeader";
import { getDataPasien } from "../src/actions/kartu-pasien-action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getDataPasien: state.kartuPasien.getDataPasien,
  };
};

const columns = [
  {
    name: "NKP",
    options: {
      filter: false,
    },
  },
  {
    name: "Nama",
    options: {
      filter: false,
    },
  },
  {
    name: "Alamat",
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

const Dashboard = (props) => {
  useEffect(() => {
    if (!props.getDataPasien) {
      props.dispatch(getDataPasien());
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getDataPasien}
        title="Kartu Pasien"
        columns={columns}
      />
    </>
  );
};

Dashboard.layout = Admin;
export default connect(mapStateToProps, null)(Dashboard);
