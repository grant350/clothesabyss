var db = require('../../database');


//SELECT * from (SELECT * FROM PRODUCTS where PRODUCTID = 99) AS z LEFT JOIN VARIENTS ON VARIENTS.PRODUCTID = z.PRODUCTID;

async function z(id, tablemap) {

console.log(tablemap)
var tableskeys = Object.keys(tablemap);

var sqllinep1='SELECT * from ';

var mainidname;
var maintname;
  tableskeys.forEach((tablekey,index)=>{
    console.log(tablemap[tablekey])
    var tname = tablemap[tablekey].name;
    var idname = tablemap[tablekey].IDNAME;

    if (tablekey === "main" ||  tablekey === "MAIN" || index === 0){
      sqllinep1 =sqllinep1+ `(SELECT * FROM ${tname} WHERE ${idname} = ${id}) AS T`
       // sqlline = `SELECT  * FROM ${tname} WHERE ${idname} = ${id}`
       mainidname=idname
       maintname= tname;
    } else {
        sqllinep1 = sqllinep1 + ` LEFT JOIN ${tname} ON ${tname}.${mainidname} = T.${mainidname} `
    }
  })
var sqlquery = sqllinep1


console.log(sqlquery)

  var value = await db.query(sqlquery)
    .then(([rows,fields]) => {
      var array=[]
    rows.forEach(item=>{
      var item2 = JSON.stringify(item)
      array.push(JSON.parse(item2))
    })
    console.log(array)
        return array
    }).catch((err) => {
      return false
    })
    return value
}
 // var x =  z("userbase")
  module.exports = z
