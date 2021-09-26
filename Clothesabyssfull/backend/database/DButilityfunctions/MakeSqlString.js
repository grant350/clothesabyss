// var reclooper = require('./reclooper');
var db = require('../../database');
const mysql = require('mysql2');

module.exports = function (splittableObject, ID) {
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)
  console.log(ID)

console.log('splittableObject',splittableObject)
var mainID = splittableObject[Object.keys(splittableObject)[0]]['IDNAME']

Object.keys(splittableObject).forEach(table=>{
  console.log('tableobj',table);
console.log('tablename',splittableObject[table]['name']);
//UPDATE table_name
var data = splittableObject[table]['data']
var type = splittableObject[table]['type']
var usedFunc = null
var tn = splittableObject[table]['name']
var idname = splittableObject[table]['IDNAME']

if (type === "columns"){
  usedFunc = MakeColumns
} else {
  usedFunc = StringData
}



function MakeColumns(obj){
  var string=""
  var columnNames = Object.keys(obj);
  var values = Object.values(obj)
  columnNames.forEach(coln=>{
    string+=coln+'='+"?"+", "
  });
  string = string.substring(0, string.lastIndexOf(",")) ;
  values.forEach((item,index)=>{
if (typeof item !== "string" && item !== true && item !== false){
  values[index]=JSON.stringify(item)

}

  })
  console.log(values)
  var sqlstring = `UPDATE ${tn} SET ${string} WHERE ${idname} = ${ID}`
  console.log(sqlstring);

  var sql2 = mysql.format(sqlstring, values);
console.log(sql2)
  db.query(sql2).then(answer=>{
    console.log(answer)
  }).catch(err=>{
    console.log(err)
  })
}

function StringData(obj){
  var dataobjName = splittableObject[table]['dataobjName']
  var stringobj = JSON.stringify(obj)
  var string=`INSERT INTO ${tn} (${mainID}, ${dataobjName}) VALUES (?, ?)`;
  var sql = mysql.format(string, [ID, stringobj]);
  db.query(sql).then(answer=>{
    console.log(answer)
  }).catch(err=>{
    console.log(err)
  })
}


if (Array.isArray(data)){
  console.log(data)
  data.forEach(item=>{
    usedFunc(item)
  })
} else {
  usedFunc(data)
}






//-- select * from PRODUCTS;
// -- SELECT * FROM PRODUCTS LEFT JOIN VARIENTS
// --          ON PRODUCTS. PRODUCTID=VARIENTS.PRODUCTID
//combines the tables;


})

};
