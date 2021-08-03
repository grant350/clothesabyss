


var db = require('./database');



module.exports = (tname) => {

  var querys = {
    "showTableCheck": `SELECT *  FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'maindatabase') AND (TABLE_NAME = '${tname}') LIMIT 1;`,
    "getCol": `SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = '${tname.toUpperCase()}' AND TABLE_SCHEMA='maindatabase';`
  }
  var sqlline = querys.getCol

  return db.execute(sqlline, [])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        console.log("TABLE EXIST CHECKTABLE LINE 21")
        return rows
      } else {
        return false
      }
    }).catch((err) => {
      //console.log(err)
      //console.log("table does not exist ")
    })


}
