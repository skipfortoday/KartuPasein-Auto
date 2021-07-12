const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      let querydata = await qryKartuPasien.query(
        `SELECT TOP 1 CONVERT(date, TglAuto) as TglAuto1,
        CONVERT(varchar, TglAuto , 108) as TimeAuto FROM tblPerawatanLokasiFotoAfter 
        WHERE dataAnchor = '${req.query.id}' ORDER BY TglAuto DESC`
      );
      res.status(200).json({
        success: true,
        message: "Berhasil Mendapatkan Data",
        data: querydata[0].TglAuto1 + " " + querydata[0].TimeAuto,
      });
    } else if (req.method === "POST") {
      let queryTemp = `DELETE FROM tmpPerawatanLokasiFotoAfter;
        INSERT INTOtmpPerawatanLokasiFotoAfter
        ("NoAuto", "NoAutoPerawatan", "Keterangan", "UserEntry", "LoginComp", "CompName", "TglActivitas", "JamActivitas", "LokasiFotoAfter", "TglAuto") VALUES ${req.body.data};`;
      let queryMerge = ` MERGE tblPerawatanLokasiFotoAfter AS Target
                        USING (SELECT * FROM tmpPerawatanLokasiFotoAfter) AS Source
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
                            VALUES  (Source.NoAuto, Source.NoAutoPerawatan, Source.Keterangan, Source.UserEntry, Source.LoginComp, Source.CompName, Source.TglActivitas, Source.JamActivitas, Source.LokasiFotoAfter, Source.TglAuto)
                        OUTPUT $action, Inserted.*, Deleted.*;`;
      await qryKartuPasien.execute(queryTemp);
      await qryKartuPasien.execute(queryMerge);
      firebase
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
    } else {
      res.status(404).json({
        success: false,
        message: "Anda Kehilangan Arah",
        data: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      data: false,
    });
  }
}
