const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        await qryKartuPasien.execute(`
         SELECT Top 0 * INTO "#tmpDokter" FROM "tblDokter"
         INSERT INTO "#tmpDokter"
         ("IDDokter", "NamaDokter", "Status", "Exported" , TglAuto) VALUES ${req.body.data};
         MERGE tblDokter AS Target
         USING (SELECT * FROM "#tmpDokter") AS Source
         ON (Target.IDDokter = Source.IDDokter)
         WHEN MATCHED THEN
             UPDATE SET Target.NamaDokter = Source.NamaDokter, 
                     Target.Status = Source.Status,
                 Target.Exported = Source.Exported, 
                 Target.TglAuto = Source.TglAuto 		  
         WHEN NOT MATCHED BY TARGET THEN
             INSERT (IDDokter,NamaDokter,Status,Exported,TglAuto)
             VALUES (Source.IDDokter, Source.NamaDokter, Source.Status,
         Source.Exported,Source.TglAuto);`);

        await firebase
          .database()
          .ref("/datapasien")
          .update({
            sb2: moment().format("YYYY-MM-DD HH:mm:ss"),
          });

        res.status(200).json({
          success: true,
          message: "Berhasil Post Data",
          data: req.body.data,
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
          `SELECT IDDokter, NamaDokter , Status, CONVERT(varchar, TglAuto,113) as TimeSyc 
        FROM tblDokter ORDER BY TglAuto DESC`
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
    res.json("Eror Sycron dokter ", error);
  }
}
