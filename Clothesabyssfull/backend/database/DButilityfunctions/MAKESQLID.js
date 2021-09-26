var db = require('../../database');
var DBCheckTableID= require('./CHECKTABLEID');

//pool.promise()
async function a(tablename,idname, index) {


  if (index){
    let hasindex = await DBCheckTableID(tablename, idname, index)
    // console.log(hasindex)
    if (hasindex){
      return index
    }
  }


  var sqlline = `INSERT INTO ${tablename} () VALUES ();`;
  var value = await db.query(sqlline)
    .then(([rows, fields]) => {
      // console.log(rows.insertId)
      // console.log(rows.insertId)
      return rows.insertId
    }).catch((err) => {
      return false
    })
    // db.end()
    return value
}
 // var x =  z("userbase")
  module.exports = a
 // console.log(x)
// console.log(x)
