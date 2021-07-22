import React, { useEffect } from "react";
import BottomNav from "../../src/layouts/bottomNav";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getPerawatan } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getPerawatan: state.kartuPasien.getPerawatan,
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

const Perawatan = (props) => {
  useEffect(() => {
    if (!props.getPerawatan) {
      props.dispatch(getPerawatan());
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getPerawatan}
        title="Kartu Pasien Table Perawatan"
        columns={columns}
      />
    </>
  );
};

Perawatan.layout = BottomNav;
export default connect(mapStateToProps, null)(Perawatan);
