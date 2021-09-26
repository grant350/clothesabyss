var db = require('../database');



module.exports = (req, res, next) => {

// console.log(req.permissions)
    if (req.permissions === "admin") {
      var messageClientErrors = []

      var table = req.query.tablename
      //var removeKeys = req.body.tableName
// console.log(table)

if (table){
  var sqlline = `SELECT * from ${table}`
  console.log(sqlline)
  db.execute(sqlline).then(([rows, fields]) => {
    console.log("all rows made it throught 30")
    console.log(rows)
    var dataarray =[]
    rows.forEach(o=>{
var obj={}
      Object.keys(o).forEach(z=>{
        try{
          obj[z]=JSON.parse(o[z])
        }
        catch{
          obj[z]=o[z]
          console.log("cant parse 39")
        }
      })
      // console.log(obj)
      dataarray.push(obj)
    })

    res.json({"data":dataarray})
  }).catch((err) => {
    console.log("table does not exist or someother error ")
    messageClientErrors.push("Table Problem 119")
    res.json({"message":"table doesn not exist "})
  })


}else{

  res.json({"message":"no table"})
}








    }




}
