import React from "react";
import MUIDataTable from "mui-datatables";

class TablefixHeader extends React.Component {
  render() {
    const columns = this.props.columns;
    const data = this.props.data;
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "standard",
      fixedHeader: true,
      fixedSelectColumn: true,
      tableBodyHeight: "400px",
    };

    return (
      <MUIDataTable
        title={"Kartu Pasien"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default TablefixHeader;
