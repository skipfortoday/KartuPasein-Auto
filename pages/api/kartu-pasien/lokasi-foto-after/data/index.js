const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        await qryKartuPasien.execute(` 
          SELECT Top 0 * INTO "#tmpPerawatanLokasiFotoAfter" FROM "tblPerawatanLokasiFotoAfter";
          INSERT INTO "#tmpPerawatanLokasiFotoAfter"
          ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto") VALUES ${req.body.data};
          MERGE tblPerawatanLokasiFotoAfter AS Target
                  USING (SELECT * FROM #tmpPerawatanLokasiFotoAfter) AS Source
                  ON (Target.NoAuto = Source.NoAuto)
                  WHEN MATCHED THEN
                      UPDATE SET
                              Target.NoAuto = Source.NoAuto,
                              Target.NoAutoPerawatan = Source.NoAutoPerawatan,
                              Target.Keterangan = Source.Keterangan, 
                              Target.UserEntry = Source.UserEntry,
                              Target.LoginComp = Source.LoginComp,
                              Target.CompName = Source.CompName,
                              Target.TglActivitas = Source.TglActivitas,
                              Target.JamActivitas = Source.JamActivitas,
                              Target.LokasiFotoAfter = Source.LokasiFotoAfter,
                              Target.TglAuto = Source.TglAuto
                  WHEN NOT MATCHED BY TARGET THEN
                       INSERT
                       ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto")
                        VALUES  (Source.NoAuto, Source.NoAutoPerawatan, Source.Keterangan, Source.UserEntry, Source.LoginComp, Source.CompName, Source.TglActivitas, Source.JamActivitas, Source.LokasiFotoAfter, Source.TglAuto);`);
        await firebase
          .database()
          .ref("/datapasien")
          .update({
            sb2: moment().format("YYYY-MM-DD HH:mm:ss"),
          });

        await res.status(200).json({
          success: true,
          message: "Berhasil Post Data",
          data: false,
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
          `SELECT NoAuto, LokasiFotoAfter,
        CONVERT(varchar, TglAuto,113) as TglAuto 
        FROM tblPerawatanLokasiFotoAfter
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
    res.status(500).json("Eror Sycron Lokasi Foto After ", error);
  }
}
