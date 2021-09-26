var db = require('../../database');


async function z(tname) {
  var sqlline = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME ` + `= '${tname}' AND TABLE_SCHEMA = 'maindatabase' `;
  var value = await db.query(sqlline)
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return true
      } else {
        return false
      }
    }).catch((err) => {
      return false
    })
    return value
}
 // var x =  z("userbase")
  module.exports = z
