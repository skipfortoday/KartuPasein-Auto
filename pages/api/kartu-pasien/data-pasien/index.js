const qryKartuPasien = require("../../../../src/config/sql-kartu-pasien");

export default async function handler(req, res) {
  try {
    let querydata = await qryKartuPasien.query(
      `SELECT NKP, Nama FROM tblDataPasien`
    );
    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: querydata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      data: false,
    });
  }
}
