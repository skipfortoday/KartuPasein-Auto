const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      let querydata = await qryKartuPasien.query(
        `SELECT TOP 1 CONVERT(date, TglAuto) as TglAuto1,
        CONVERT(varchar, TglAuto , 108) as TimeAuto FROM tblBA WHERE dataAnchor = '${req.query.id}' ORDER BY TglAuto DESC`
      );
      res.status(200).json({
        success: true,
        message: "Berhasil Mendapatkan Data",
        data: querydata[0].TglAuto1 + " " + querydata[0].TimeAuto,
      });
    } else if (req.method === "POST") {
      let querydata = await qryKartuPasien.execute(
        `DELETE FROM "dbo"."tmpBA";
        INSERT INTO "tmpBA"
          ("IDBA", "NamaBA", "Status", "Exported" , TglAuto) VALUES ${req.body.data}
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
          sb2: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      res.status(200).json({
        success: true,
        message: "Berhasil Post Data",
        data: mergedata,
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
