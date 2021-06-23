const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        let querydata = await qryKartuPasien.query(
          ` ${req.body.data}
            ;`
        );
        console.log(querydata);
        res.status(200).json({
          success: true,
          message: "Berhasil Post Data",
          data: querydata,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error,
          data: false,
        });
      }
    } else if (req.method === "GET") {
      try {
        let querydata = await qryKartuPasien.query(
          `SELECT NoAuto, LokasiFotoBefore,
        CONVERT(varchar, TglAuto,113) as TglAuto 
        FROM tblPerawatanLokasiFotoBefore
        ORDER BY TglAuto DESC`
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
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
