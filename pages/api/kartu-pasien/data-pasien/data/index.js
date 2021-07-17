const qryKartuPasien = require("../../../../../src/config/sql-kartu-pasien");
import firebase from "../../../../../src/config/firebase";
import moment from "moment";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      try {
        await qryKartuPasien.execute(`
        SELECT Top 0 * INTO "#tmpDataPasien" FROM "tblDataPasien";
        INSERT INTO "#tmpDataPasien"
           ("NKP"
            ,"NoAuto"
            ,"TglAwalDaftar"
            ,"Nama"
            ,"Alamat"
            ,"TelpRumah"
            ,"HP"
            ,"Fax"
            ,"TglLahir"
            ,"NoDist"
            ,"NoSponsor"
            ,"Status"
            ,"Keterangan"
            ,"TglActivitas"
            ,"JamActivitas"
            ,"UserEntry"
            ,"LoginComp"
            ,"CompName"
            ,"PasienLama"
            ,"Sponsor"
            ,"Exported"
            ,"LastCallDateUltah"
            ,"tempCallPasien"
            ,"tempCallDate"
            ,"tempCallTime"
            ,"tempCallKet"
            ,"tempNoAutoHistoryCallPasienUltah"
            ,"IDSponsor"
            ,"LokasiFoto"
            ,"NoKTP"
            ,"NamaKTP"
            ,"TempatLahir"
            ,"AlamatKTP"
            ,"TelpKTP"
            ,"Kota"
            ,"KotaKTP"
            ,"KotaSMS"
            ,"StatusLtPack"
            ,"NoDistLtPack"
            ,"IDSponsorLtPack"
            ,"PinBB"
            ,"StatusDiskonPasien"
            ,"TglAuto") VALUES ${req.body.data};
        MERGE tblDataPasien AS Target
        USING (SELECT * FROM #tmpDataPasien) AS Source
        ON (Target.NKP = Source.NKP)
        WHEN MATCHED THEN
            UPDATE SET Target.NKP = Source.NKP,
                       Target.NoAuto = Source.NoAuto,
                       Target.TglAwalDaftar = Source.TglAwalDaftar,
                       Target.Nama = Source.Nama,
                       Target.Alamat = Source.Alamat,
                       Target.TelpRumah = Source.TelpRumah,
                       Target.HP = Source.HP,
                       Target.Fax = Source.Fax,
                       Target.TglLahir = Source.TglLahir,
                       Target.NoDist = Source.NoDist,
                       Target.NoSponsor = Source.NoSponsor,
                       Target.Status = Source.Status,
                       Target.Keterangan = Source.Keterangan,
                       Target.TglActivitas = Source.TglActivitas,
                       Target.JamActivitas = Source.JamActivitas,
                       Target.UserEntry = Source.UserEntry,
                       Target.LoginComp = Source.LoginComp,
                       Target.CompName = Source.CompName,
                       Target.PasienLama = Source.PasienLama,
                       Target.Sponsor = Source.Sponsor,
                       Target.Exported = Source.Exported,
                       Target.LastCallDateUltah = Source.LastCallDateUltah,
                       Target.tempCallPasien = Source.tempCallPasien,
                       Target.tempCallDate = Source.tempCallDate,
                       Target.tempCallTime = Source.tempCallTime,
                       Target.tempCallKet = Source.tempCallKet,
                       Target.tempNoAutoHistoryCallPasienUltah = Source.tempNoAutoHistoryCallPasienUltah,
                       Target.IDSponsor = Source.IDSponsor,
                       Target.LokasiFoto = Source.LokasiFoto,
                       Target.NoKTP = Source.NoKTP,
                       Target.NamaKTP = Source.NamaKTP,
                       Target.TempatLahir = Source.TempatLahir,
                       Target.AlamatKTP = Source.AlamatKTP,
                       Target.TelpKTP = Source.TelpKTP,
                       Target.Kota = Source.Kota,
                       Target.KotaKTP = Source.KotaKTP,
                       Target.KotaSMS = Source.KotaSMS,
                       Target.StatusLtPack = Source.StatusLtPack,
                       Target.NoDistLtPack = Source.NoDistLtPack,
                       Target.IDSponsorLtPack = Source.IDSponsorLtPack,
                       Target.PinBB = Source.PinBB,
                       Target.StatusDiskonPasien = Source.StatusDiskonPasien,
                       Target.TglAuto = Source.TglAuto
        WHEN NOT MATCHED BY TARGET THEN
      INSERT (NKP
      ,NoAuto
      ,TglAwalDaftar
      ,Nama
      ,Alamat
      ,TelpRumah
      ,HP
      ,Fax
      ,TglLahir
      ,NoDist
      ,NoSponsor
      ,Status
      ,Keterangan
      ,TglActivitas
      ,JamActivitas
      ,UserEntry
      ,LoginComp
      ,CompName
      ,PasienLama
      ,Sponsor
      ,Exported
      ,LastCallDateUltah
      ,tempCallPasien
      ,tempCallDate
      ,tempCallTime
      ,tempCallKet
      ,tempNoAutoHistoryCallPasienUltah
      ,IDSponsor
      ,LokasiFoto
      ,NoKTP
      ,NamaKTP
      ,TempatLahir
      ,AlamatKTP
      ,TelpKTP
      ,Kota
      ,KotaKTP
      ,KotaSMS
      ,StatusLtPack
      ,NoDistLtPack
      ,IDSponsorLtPack
      ,PinBB
      ,StatusDiskonPasien
      ,TglAuto)
            VALUES (Source.NKP
              ,Source.NoAuto
              ,Source.TglAwalDaftar
              ,Source.Nama
              ,Source.Alamat
              ,Source.TelpRumah
              ,Source.HP
              ,Source.Fax
              ,Source.TglLahir
              ,Source.NoDist
              ,Source.NoSponsor
              ,Source.Status
              ,Source.Keterangan
              ,Source.TglActivitas
              ,Source.JamActivitas
              ,Source.UserEntry
              ,Source.LoginComp
              ,Source.CompName
              ,Source.PasienLama
              ,Source.Sponsor
              ,Source.Exported
              ,Source.LastCallDateUltah
              ,Source.tempCallPasien
              ,Source.tempCallDate
              ,Source.tempCallTime
              ,Source.tempCallKet
              ,Source.tempNoAutoHistoryCallPasienUltah
              ,Source.IDSponsor
              ,Source.LokasiFoto
              ,Source.NoKTP
              ,Source.NamaKTP
              ,Source.TempatLahir
              ,Source.AlamatKTP
              ,Source.TelpKTP
              ,Source.Kota
              ,Source.KotaKTP
              ,Source.KotaSMS
              ,Source.StatusLtPack
              ,Source.NoDistLtPack
              ,Source.IDSponsorLtPack
              ,Source.PinBB
              ,Source.StatusDiskonPasien
              ,Source.TglAuto);`);
        await firebase
          .database()
          .ref("/datapasien")
          .update({
            sb2: moment.parseZone(moment()).format("YYYY-MM-DD HH:mm:ss"),
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
