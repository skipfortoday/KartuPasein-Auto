const ADODB = require("node-adodb");
const qryKartuPasien = ADODB.open(
  "Provider=SQLOLEDB.1;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=KartuPasien_SB02_Test;Data Source=localhost;"
);
module.exports = qryKartuPasien;
