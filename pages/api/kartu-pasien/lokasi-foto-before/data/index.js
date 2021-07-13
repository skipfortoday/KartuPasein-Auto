const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        await qryKartuPasien.execute(
          `DELETE FROM "dbo"."tmpPerawatanLokasiFotoBefore";
          INSERT INTO "tmpPerawatanLokasiFotoBefore" ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry" ,"LoginComp","CompName","TglActivitas","JamActivitas","LokasiFotoBefore","TglAuto") VALUES ${req.body.data};`
        );
        let mergedata = await qryKartuPasien.execute(`
        MERGE tblPerawatanLokasiFotoBefore AS Target
        USING (SELECT * FROM tmpPerawatanLokasiFotoBefore) AS Source
        ON (Target.NoAuto = Source.NoAuto)
        WHEN MATCHED THEN
            UPDATE SET Target.NoAutoPerawatan = Source.NoAutoPerawatan,
                Target.Keterangan = Source.Keterangan,
                Target.UserEntry = Source.UserEntry,
                Target.LoginComp = Source.LoginComp,
                Target.CompName = Source.CompName,
                Target.TglActivitas = Source.TglActivitas,
                Target.JamActivitas = Source.JamActivitas,
                Target.LokasiFotoBefore = Source.LokasiFotoBefore,
                Target.TglAuto = Source.TglAuto
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (NoAuto, NoAutoPerawatan,Keterangan, UserEntry ,LoginComp,CompName,
            TglActivitas,JamActivitas,LokasiFotoBefore,TglAuto)
            VALUES (Source.NoAuto, Source.NoAutoPerawatan,Source.Keterangan,
              Source.UserEntry ,Source.LoginComp,Source.CompName,
              Source.TglActivitas,Source.JamActivitas,Source.LokasiFotoBefore,Source.TglAuto)
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
