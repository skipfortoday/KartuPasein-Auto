const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        let querydata = await qryKartuPasien.execute(
          `
          DELETE FROM "dbo"."tmpPerawatanLokasiFotoBefore";
          INSERT INTO "tmpPerawatanLokasiFotoBefore"
           ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry" ,"LoginComp","CompName",
           "TglActivitas","JamActivitas","LokasiFotoBefore",TglAuto) VALUES ${req.body.data}
            ;`
        );

        let mergedata = await qryKartuPasien.execute(`
        MERGE tblBA AS Target
        USING (SELECT * FROM tmpBA) AS Source
        ON (Target.IDBA = Source.IDBA)
        WHEN MATCHED THEN
            UPDATE SET Target.NamaBA = Source.NamaBA, 
                    Target.Status = Source.Status,
                Target.Exported = Source.Exported, 
                Target.TglAuto = Source.TglAuto 		  
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (IDBA,NamaBA,Status,Exported,TglAuto)
            VALUES (Source.IDBA, Source.NamaBA, Source.Status,
        Source.Exported,Source.TglAuto)
        OUTPUT $action, Inserted.*, Deleted.*;`);
        firebase
          .database()
          .ref("/datapasien")
          .update({
            sb2: moment.parseZone(moment()).format("YYYY-MM-DD HH:mm:ss"),
          });
        res.status(200).json({
          success: true,
          message: "Berhasil Post Data",
          data: mergedata,
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
    res.json("Eror Sycron dokter ", error);
  }
}
