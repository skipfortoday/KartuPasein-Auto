import React, { useEffect } from "react";
import Admin from "../../src/layouts/admin";
import TablefixHeader from "../../src/components/tablefixHeader";
import { getLokasiFotoBefore } from "../../src/actions/kartu-pasien-action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    getLokasiFotoBefore: state.kartuPasien.getLokasiFotoBefore,
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
    name: "LokasiFotoBefore",
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

const LokasiFotoBefore = (props) => {
  useEffect(() => {
    if (!props.getLokasiFotoBefore) {
      props.dispatch(getLokasiFotoBefore());
    }
  });
  return (
    <>
      <TablefixHeader
        data={props.getLokasiFotoBefore}
        title="Kartu Pasien Table Lokasi Foto Before"
        columns={columns}
      />
    </>
  );
};

LokasiFotoBefore.layout = Admin;
export default connect(mapStateToProps, null)(LokasiFotoBefore);
