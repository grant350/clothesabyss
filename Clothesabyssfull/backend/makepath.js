


var db = require('./database');



module.exports = (req, res, next) => {

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
        //console.log("tableExist")
        return rows
      } else {
        //console.log("this table is going to be made now...")
        return false
      }
    }).catch((err) => {
      //console.log(err)
      //console.log("table does not exist ")
      messageClientErrors.push("Table Does Not Exist")
    })


}
