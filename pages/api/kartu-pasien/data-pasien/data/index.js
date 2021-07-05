const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        let querydata = await qryKartuPasien.execute(
          `
          DELETE FROM "dbo"."tmpBA";
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
          `SELECT NKP, Nama , Alamat, CONVERT(varchar, TglAuto,113) as WaktuSyc FROM tblDataPasien ORDER BY TglAuto DESC`
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

// const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");

// export default async function handler(req, res) {
//   try {
//     if (req.method === "POST") {
//       try {
//         let querydata = await qryKartuPasien.query(
//           `INSERT INTO tmpTblDataPasien (
//             NKP,NoAuto,TglAwalDaftar,Nama,Alamat,TelpRumah,
//             HP,Fax,TglLahir,NoDist,NoSponsor,Status,Keterangan,
//             TglActivitas,JamActivitas,UserEntry,LoginComp,CompName,PasienLama,Sponsor,
//             Exported,LastCallDateUltah,tempCallPasien,tempCallDate,
//             tempCallTime,tempCallKet,tempNoAutoHistoryCallPasienUltah,
//             IDSponsor,LokasiFoto,NoKTP,NamaKTP,TempatLahir,AlamatKTP,
//             TelpKTP,Kota,KotaKTP,KotaSMS,StatusLtPack,NoDistLtPack,
//             IDSponsorLtPack,PinBB,StatusDiskonPasien,TglAuto
//             ) VALUES ${req.body.data}
//             ;`
//         );
//         console.log(querydata);
//         res.status(200).json({
//           success: true,
//           message: "Berhasil Mendapatkan Data",
//           data: querydata,
//         });
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({
//           success: false,
//           message: error,
//           data: false,
//         });
//       }
//     } else if (req.method === "GET") {
//       try {
//         let querydata = await qryKartuPasien.query(
//           `SELECT NKP, Nama , Alamat, CONVERT(varchar, TglAuto,113) as TglAuto
//         FROM tblDataPasien ORDER BY TglAuto DESC`
//         );
//         res.status(200).json({
//           success: true,
//           message: "Berhasil Mendapatkan Data",
//           data: querydata,
//         });
//       } catch (error) {
//         res.status(500).json({
//           success: false,
//           message: error,
//           data: false,
//         });
//       }
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Anda Kehilangan Arah",
//         data: false,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json(error);
//   }
// }
