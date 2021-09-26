var db = require('../../database');


async function check(tname,idname,index) {
  var sqlline = `Select * from ${tname} where ${idname} = ${index}`;
  var value = await db.query(sqlline)
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return fields
      } else {
        return false
      }
    }).catch((err) => {
      return false
    })
    return value
}
 // var x =  z("userbase")
  module.exports = check
