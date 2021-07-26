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
  var data = req.body.data

  if (req.permissions === "admin" && data) {
    console.log("DATAPUSH: LINE18 is admin passed")

var SQLKeyRemover = req.body.postDataInfo.SQLKeyRemover
var JSONKeyRemover = req.body.postDataInfo.JSONKeyRemover
//called datastripperObjs


var OBJECTOFDATA={
"data": data,
"sqlObject": RK(data, SQLKeyRemover),
"jsonObject":RK(data, JSONKeyRemover),
"sqlTypeMap": req.body.postDataInfo.SQLVALUETYPES,
"TableName": req.body.MANIPULATIONINFO.TABLENAME.toUpperCase(),
"TABLEID":req.body.MANIPULATIONINFO.TABLEID.toUpperCase(),
"JSONKeyRemover":req.body.postDataInfo.JSONKeyRemover,
"ID":req.body.ID,
"JSONFileIDMap":req.body['MANIPULATIONINFO'].JSONFileIDMap,
"Sqlcolumnnames":[],
"JSONFILEURL":req.body['MANIPULATIONINFO'].JSONFILEURL,
"JSONIDNAME":req.body['MANIPULATIONINFO'].jsonFileStartKey
}
console.log("OBJECTOFDATA LINE 39")
console.log(OBJECTOFDATA)

//investigate make more log find out how to prevent future errors



var sqlstatments={
  "beginpromiseSQL":`SELECT * FROM ${OBJECTOFDATA.TableName}`
}

var rows = CTE(OBJECTOFDATA.TableName)

rows.then(ROWINFO=>{
console.log(ROWINFO);
ROWINFO.forEach(row => {
  OBJECTOFDATA.Sqlcolumnnames.push(row.COLUMN_NAME)
});
console.log(OBJECTOFDATA)



db.execute(sqlstatments.beginpromiseSQL, []).then(([rows, fields]) => {
  //spec id calculator
  console.log(rows)
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
  console.log("ANSWER line 77")
  console.log(answer)
  var olddata = OBJECTOFDATA.sqlObject
  var colnames = OBJECTOFDATA.Sqlcolumnnames

 Object.keys(olddata).forEach((k) => {
   var varient
   try {
     varient = JSON.parse(olddata[k])
   } catch {
     varient = olddata[k]
   }
   if (varient instanceof Array) {
     if (OBJECTOFDATA.JSONFileIDMap[k]) {
       olddata[k].forEach((i, index) => {
         olddata[k][index][OBJECTOFDATA.JSONFileIDMap[k]] = OBJECTOFDATA['ID']+"_"+(index + 1)
       })
     }
   }
 })
 console.log("OLDDATA line97");
 console.log(olddata);

// console.log("RETURNED FALSE BREAK CODE")
// return false;

 return {
   'json': olddata,
   "col": colnames
 }
}).then((olddataObject) => {
 console.log("olddataObject line 108")
 console.log(olddataObject)
 console.log("ERROR IN SECTION line 110-130")

 var KeyArray = [];
 var ValueArray = [];
 var QArray = [];
 olddataObject.col.forEach(cn => {
   console.log("cn line 116")
   console.log(cn)
   if (cn.toLowerCase() === "date") {
     var d = new Date();
     var date =d.toISOString().split('T')[0]
     ValueArray.push(date)
   }

   if (olddataObject.json[cn]) {
     console.log("line 125 error test paragraphs undefined")
     console.log(olddataObject.json[cn])

     if (olddataObject.json[cn] instanceof Array || olddataObject.json[cn] instanceof Object) {
       var rowvalue = JSON.stringify(olddataObject.json[cn])
       ValueArray.push(rowvalue)
     } else {
       var answerstring = typeof olddataObject.json[cn] === "string"
       var answernumber = typeof olddataObject.json[cn] === "number"
       if (answerstring || answernumber) {
         ValueArray.push(olddataObject.json[cn])
       }
     }
   }else{
     console.log("NOT IN DATA SET line 139")
   }

console.log("olddataObject.json[cn]")
   console.log(olddataObject.json[cn])
   console.log("cn")

   console.log(cn)
   if (olddataObject.json[cn] || cn.toLowerCase() === "date") {
     KeyArray.push(cn)
     QArray.push("?")
   } else {
     KeyArray.push(cn)
     ValueArray.push("null")
     QArray.push("?")
   }
 })
 console.log("KeyArray line 156")
console.log(KeyArray)
console.log("QArray line 158")
console.log(QArray)
console.log("ValueArray line 160")
console.log(ValueArray)

 KeyArray.splice(0, 1)
 QArray.splice(0, 1)
 ValueArray.splice(0, 1)

 var sqlline;
 if (OBJECTOFDATA['ID']) {
   var sqlUpdateStringArray = []
   KeyArray.forEach((key, index) => {
     console.log(key)
     sqlUpdateStringArray.push(`${key}=${QArray[index]}`)
   })
   console.log(sqlUpdateStringArray)
   console.log("sqlUpdateStringArray")

   sqlUpdateStringArray = sqlUpdateStringArray.join(',')
   console.log(sqlUpdateStringArray)
   sqlline = `UPDATE ${OBJECTOFDATA.TableName} SET ${sqlUpdateStringArray}
                                  WHERE ${OBJECTOFDATA.TABLEID} = ${OBJECTOFDATA['ID']}`

   console.log(sqlline)
 } else {
   console.log("NO ID FAILED")
   res.json({
     "FAILED": true
   })
 }
 try {
   db.execute(sqlline, ValueArray).then(([rows, fields]) => {
     console.log("made it ")
   }).catch((err) => {
     console.log("err sql line 159")
     console.log(err)
   })
 } catch {
   console.log("MAJOR ERROR IN UPDATING SQL OR INSERTING SQL LINE 198 DATAPUSH")
 }


 var sline = `SELECT * FROM ${OBJECTOFDATA.TableName}`
  return db.execute(sline, []).then(([rows, fields]) => {
   var s = rows[rows.length - 1]
   var newobj = {}
   Object.keys(s).forEach(k => {
     newobj[k] = s[k]
     try {
       newobj[k] = JSON.parse(newobj[k])
     } catch {
       console.log("could not parse 144")
     }
   })
   console.log("NEWOBJ line 174 from loopObjectValues()")
   console.log(newobj)
   return newobj;
 }).then((newjsondata) => {
   console.log("newjsondata LINE:182")

  console.log(newjsondata)
console.log(OBJECTOFDATA.JSONFILEURL)
console.log(fs.existsSync(OBJECTOFDATA.JSONFILEURL))

  if (fs.existsSync(OBJECTOFDATA.JSONFILEURL)) {
    console.log("FILE EXIST")

      var removedKeys = RK(newjsondata, OBJECTOFDATA.JSONKeyRemover)
      if (OBJECTOFDATA.JSONFILEURL) {
        //console.log(removedKeys)
        fs.readFile(OBJECTOFDATA.JSONFILEURL, function readFileCallback(err, rawjsondata) {
          try {rawjsondata= JSON.parse(rawjsondata);}catch{
console.log("no go 195")          }
        if (rawjsondata[OBJECTOFDATA.JSONIDNAME]) {
          if (OBJECTOFDATA['ID']) {
            var filterdata = rawjsondata[OBJECTOFDATA.JSONIDNAME].filter(item => item[OBJECTOFDATA.TABLEID] !== OBJECTOFDATA['ID'])
            console.log("filterdata")
            console.log(filterdata)
            filterdata.push(newjsondata)
            rawjsondata[OBJECTOFDATA.JSONIDNAME]=filterdata
            rawjsondata = JSON.stringify(rawjsondata);
            fs.writeFile(OBJECTOFDATA.JSONFILEURL, rawjsondata, 'utf8', function(err) {
              console.log(err)
            });
          }
          //console.log("rawjsondata")
          //console.log(rawjsondata)


        } else {
          console.log("cannont put new json in")
          //console.log("error startkey may not be the right spelling")

        }


      })




    }
  }





 }).catch((err) => {
  console.log(err);
 })
})




}).catch((err)=>{
  console.log(err)
})




  }






}
