var db = require('../../database');


//SELECT * from (SELECT * FROM PRODUCTS where PRODUCTID = 99) AS z LEFT JOIN VARIENTS ON VARIENTS.PRODUCTID = z.PRODUCTID;

async function z( tablemap) {

// console.log(tablemap)
var tableskeys = Object.keys(tablemap);

  var names = tableskeys.map( (item) => {return "\'" + tablemap[item].name+"\'"})
   names=names.join(', ')

  var sqlline = `SELECT
      column_name
  FROM information_schema.columns
  WHERE table_name in(${names})`;
var sqlquery = sqlline
// console.log(sqlquery)

  var value = await db.query(sqlquery)
    .then(([rows,fields]) => {
      var array = rows.map((col)=>{return col.column_name})
        return array
    }).catch((err) => {
      return false
    })
    return value
}
 // var x =  z("userbase")
  module.exports = z
