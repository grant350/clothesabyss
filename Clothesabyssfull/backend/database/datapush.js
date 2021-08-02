var randomtoken = require('../AUTH/randomtoken');
var userobj = {}
var db = require('../database');
var ttms = 1000 * 60 * 60 * 3;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var LOGINSECRET = process.env.LOGINSECRET;
var fs = require('fs')
var RK = require('../removekeysJSON')
var CTE = require('../checktableexist')


module.exports = (req, res, next) => {
  console.log("DATAPUSH HAS STARTED LINE 16")
var data =req.body.JSONDATA.DATA
//console.log(data)
  if (req.permissions === "admin") {
    console.log("DATAPUSH: LINE18 is admin passed")

var SQLKeyRemover = req.body.datastripperObjs.SQLKeyRemover
var JSONKeyRemover = req.body.datastripperObjs.JSONKeyRemover

console.log(req.body.datastripperObjs.SQLKeyRemover)

var OBJECTOFDATA={
"data": req.body.JSONDATA,
"sqlObject": RK(data, SQLKeyRemover),
"jsonObject":RK(data, JSONKeyRemover),
"TABLENAME": req.body.MANIPULATIONINFO.TABLENAME.toUpperCase(),
"TABLEID":req.body.MANIPULATIONINFO.TABLEID.toUpperCase(),
"ID":req.body.ID,
"JSONFileIDMap":req.body['MANIPULATIONINFO'].JSONFileIDMap,
"Sqlcolumnnames":[],
"JSONFILEURL":req.body['MANIPULATIONINFO'].JSONFILEURL,
"JSONIDNAME":req.body['MANIPULATIONINFO'].jsonFileStartKey
}

console.log(OBJECTOFDATA['data'])
if (OBJECTOFDATA['data']['data'] || OBJECTOFDATA['data']['DATA']){
  OBJECTOFDATA['sqlObject']={'DATA':OBJECTOFDATA['sqlObject']}
}else{
  console.log("NO DATA TEXT FORMAT LINE 41")
}


// console.log("OBJECTOFDATA LINE 39")
// console.log(OBJECTOFDATA)

//investigate make more log find out how to prevent future errors


var sqlstatments={
  "beginpromiseSQL":`SELECT * FROM ${OBJECTOFDATA['TABLENAME']}`
}

var rows = CTE(OBJECTOFDATA['TABLENAME']);
console.log(rows)
rows.then(ROWINFO=>{
//console.log(ROWINFO);
ROWINFO.forEach(row => {
  OBJECTOFDATA.Sqlcolumnnames.push(row.COLUMN_NAME)
});
//console.log(OBJECTOFDATA)



db.execute(sqlstatments.beginpromiseSQL, []).then(([rows, fields]) => {
  //spec id calculator
//  console.log(rows)
 if (rows.length > 0) {
   var answerG = []
   rows.forEach((o, index) => {
     var newobj = {}
     Object.keys(o).forEach(k => {
       newobj[k] = o[k]
     })
     answerG.push(newobj)
   })
   return answerG
 } else {
   return null
 }
}).then((answer) => {
  // console.log("ANSWER line 77")
  // console.log(answer)
  var sqldataobj = OBJECTOFDATA.sqlObject
  var colnames = OBJECTOFDATA.Sqlcolumnnames

 Object.keys(sqldataobj).forEach((k) => {
   var varient
   try {
     varient = JSON.parse(sqldataobj[k])
   } catch {
     varient = sqldataobj[k]
   }
   if (varient instanceof Array) {
     if (OBJECTOFDATA.JSONFileIDMap[k]) {
       sqldataobj[k].forEach((i, index) => {
         sqldataobj[k][index][OBJECTOFDATA.JSONFileIDMap[k]] = OBJECTOFDATA['ID']+"_"+(index + 1)
       })
     }
   }
 })
 return {
   'sqldataobj': sqldataobj,
   "col": colnames
 }
}).then((olddataObject) => {

var sqldataobj = olddataObject.sqldataobj
 var KeyArray = [];
 var ValueArray = [];
 var QArray = [];
var dta=sqldataobj
try{
  dta['MANIPULATIONINFO']=req.body.MANIPULATIONINFO
}catch{
console.log("COULD NOT SET MANIPULATION INFO")
}

 olddataObject.col.forEach(cn => {
// console.log(cn)
   if (cn.toLowerCase() === "date") {
     var d = new Date();
     var date =d.toISOString().split('T')[0]
     ValueArray.push(date)
   }

   if (dta[cn] !== null  && dta[cn] !== undefined || cn.toLowerCase() === "date") {
     KeyArray.push(cn)
     QArray.push("?")
console.log("cn")
console.log("cn")
console.log(cn)
console.log(cn)
console.log(cn)
console.log(cn)
console.log(cn)

     if (dta[cn] instanceof Array || dta[cn] instanceof Object) {
       var rowvalue = JSON.stringify(dta[cn])
       ValueArray.push(rowvalue)
     } else {
         ValueArray.push(dta[cn])
     }

   }else{
     KeyArray.push(cn)
     ValueArray.push("null")
     QArray.push("?")
   }
 })


 KeyArray.splice(0, 1)
 QArray.splice(0, 1)
 ValueArray.splice(0, 1)

 var sqlline;
 if (OBJECTOFDATA['ID']) {
   var sqlUpdateStringArray = []
   KeyArray.forEach((key, index) => {
     // console.log(key)
     sqlUpdateStringArray.push(`${key}=${QArray[index]}`)
   })
   // console.log(sqlUpdateStringArray)
   // console.log("sqlUpdateStringArray")

   sqlUpdateStringArray = sqlUpdateStringArray.join(',')
   //console.log(sqlUpdateStringArray)
   sqlline = `UPDATE ${OBJECTOFDATA.TABLENAME} SET ${sqlUpdateStringArray}
                                  WHERE ${OBJECTOFDATA.TABLEID} = ${OBJECTOFDATA['ID']}`


   //console.log(sqlline)
 } else {
   //console.log("NO ID FAILED")
   res.json({
     "FAILED": true
   })
 }
 try {
   db.execute(sqlline, ValueArray).then(([rows, fields]) => {
     console.log("made it ")
     return true
   }).then(a=>{
     var sline = `SELECT * FROM ${OBJECTOFDATA['TABLENAME']}`
       db.execute(sline, []).then(([rows, fields]) => {
         console.log("rows 1")
         console.log(rows)
       var s = rows[rows.length -1]
       var o={...s}
       var jsondata = RK(o, JSONKeyRemover)

       Object.keys(jsondata).forEach(k => {
         try {
           jsondata[k] = JSON.parse(jsondata[k])
         } catch {
           console.log("could not parse 144")
         }
       })
       //console.log("NEWOBJ line 174 from loopObjectValues()")
       console.log(jsondata)
       return jsondata
     }).then((newjsondata) => {
       console.log("newjsondata line 212")
       console.log(newjsondata)
      if (fs.existsSync(OBJECTOFDATA.JSONFILEURL)) {
          console.log("FILE EXIST")
          if (OBJECTOFDATA.JSONFILEURL) {
            fs.readFile(OBJECTOFDATA.JSONFILEURL, function readFileCallback(err, rawjsondata) {
              try {rawjsondata= JSON.parse(rawjsondata);}catch{
                console.log("no parse rawjsondata line 195")
             }
            if (rawjsondata[OBJECTOFDATA.JSONIDNAME]) {
              if (OBJECTOFDATA['ID']) {
                var filterdata = rawjsondata[OBJECTOFDATA.JSONIDNAME].filter(item => item[OBJECTOFDATA.TABLEID] !== OBJECTOFDATA['ID'])

               console.log("filterdata")
               console.log(filterdata)
               console.log("newjsondata")
               console.log(newjsondata)

                filterdata.push(newjsondata)
                console.log("filterdata2")
                console.log(filterdata)

                rawjsondata[OBJECTOFDATA.JSONIDNAME]=filterdata
                console.log("final rawjsondata ")
                console.log(rawjsondata)
                rawjsondata = JSON.stringify(rawjsondata);
                fs.writeFile(OBJECTOFDATA.JSONFILEURL, rawjsondata, 'utf8', function(err) {
          //        console.log(err)
                });
              }
              console.log("rawjsondata")
              console.log(rawjsondata)


            } else {
              console.log("cannont put new json in")
            }
          })
        }
      }
     }).catch((err) => {
      console.log(err);
     })
   }).catch((err) => {
     //console.log("err sql line 159")
     //console.log(err)
   })
 } catch {
   console.log("MAJOR ERROR IN UPDATING SQL OR INSERTING SQL LINE 198 DATAPUSH")
 }



})




}).catch((err)=>{
  console.log(err)
})




}else{
  console.log("PERMISSION DENIED OR NO MANIPULATION INFO")
}






}
