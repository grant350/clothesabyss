var userobj = {}
var db = require('../database');
var ttms = 1000 * 60 * 60 * 3;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var LOGINSECRET = process.env.LOGINSECRET;
var path = require('path')
var fs = require('fs');
var CTE = require('../checktableexist')
var validation = require('./Validation.js')



module.exports = (req, res, next) => {

var tocontinue=false;
var isadmin;
console.log(req.permissions)
if(validation.checkIfDefinedVariable(req.permissions,"LINE 31 UPLOADER Error checking defined req.permisions")){
  try {
    req.permissions=req.permissions.toLowerCase()
    isadmin=req.permissions === "admin"
  }catch{
  }
  tocontinue=true
}


  if (isadmin && tocontiue ) {

    var JSONDATA = req.body.MainJsonData
    var MANIPULATIONINFO = req.body.MANIPULATIONINFO
    var DATASTRIPPEROBJS = req.body.datastripperObjs

    function toContinue(...array){
      console.log(array)
      if (array.indexOf(false) !== -1){
        tocontinue=false
        return false
      }else{return true}
    }
    if (tocontinue){
          var c = validation.checkOBJDefined(JSONDATA,"UPLOADER Error checking defined JSONDATA");
          var a = validation.checkOBJDefined(MANIPULATIONINFO,"UPLOADER Error checking defined MANIPULATIONINFO");
          var b = validation.checkOBJDefined(DATASTRIPPEROBJS,"UPLOADER Error checking defined DATASTRIPPEROBJS");
          var d = validation.checkOBJDefined(MANIPULATIONINFO['TABLENAME'],"UPLOADER Error checking defined mani-tablename undefined");
          var e = validation.checkOBJDefined(MANIPULATIONINFO['TABLEID'],"UPLOADER Error checking defined MANIPULATIONINFO['TABLEID'] undefined");
        tocontinue = toContinue(a,b,c,d,e)
    }
    if (tocontinue){
      JSONDATA = validation.turnKeysToCAP(JSONDATA,"ERROR JSONNOT PROVIDED OR OTHER ERROR");
    }

    var myPromiseA = new Promise((resolve, reject) => {
      if (tocontinue) {
        resolve(true)
      } else {
        console.log("error resolve false promise in upload cannot run")
        reject(new Error('toContiue in promise faileld myPromiseA'))
      }
    }).catch(error=>{
      console.log(error)
        res.json({
          "ERRORLINE": "76",
          "file": "upload.js",
          "cause": "FAILED PROMISE MAJOR ERROR",
          "status": "serverError"
        })
    });



    var myPromiseB = myPromiseA.then((answer,err) => {
      if (answer) {
        var sqlline = `SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = '${MANIPULATIONINFO['TABLEID'].toUpperCase()}' AND TABLE_SCHEMA='maindatabase'`;

        async function tableExists(tableName, tableID) {
          try {
            const query = `SELECT ${tableID} FROM ${tableName}`;
            await db.execute(query);
            return true;
          } catch (err) {
            return false;
          }
        }

        var tableBool = tableExists(MANIPULATIONINFO['TABLENAME'], MANIPULATIONINFO['TABLEID'])
        if (tableBool) {
          console.log("passed tableexist");
          return true
        } else {
          // if no table
          res.json({
            "ERRORMESSAGE": "TABLE DOES NOT EXIST",
            "ERRORLINE": "112",
            "status": "serverError",
            "cause": "tablename not found"
          })
          return false
        }
      }else{
        var error =  new Error('promiseB failed')
        console.log(error)
        return new Error('promiseB failed')
      }
    });

    var myPromiseC = myPromiseB.then((isActive) => {
      if (isActive){
            var SQLID = validation.SQLID( "UPLOADER Error SQLID cannot make id.");
            if (SQLID){
              return SQLID
            }else{
              return new Error("sqlid is not defined or is not a number")
            }
      }else{
        return false
      }
    }).then((id) => {
      // if files to upload else
      if (id){
        tocontiue = validation.checkOBJDefined( MANIPULATIONINFO['path'],"UPLOADER Error checking defined MANIPULATIONINFO['path'] undefined id check");

      if (tocontiue && id) {
        fileMapChecker = validation.checkFileMap(MANIPULATIONINFO['FileMap'], JSONDATA,"UPLOADER Error checking defined checkFileMap filemap is not defined or not match");
        UPLOAD(MANIPULATIONINFO['TABLENAME'], id);
      } else {
        res.json({
          "JSONDATA": {"DATA":JSONDATA,"MANIPULATIONINFO":MANIPULATIONINFO},
          "ID": id,
          "datastripperObjs": req.body['datastripperObjs']
        })
      }
}else{
  return new Error('promiseC failed no id')
}
      //var pathmade = checkPath(MANIPULATIONINFO['path']);
    }).catch(err=>{
      console.log(err)
      res.json({
        "message": "no permission to upload",
        "failed": true
      })
    });;


    function UPLOAD(TABLENAME, ID) {
      console.log("UPLOAD FUNCTION")
      var startpathlink = MANIPULATIONINFO['path']['startpath']
      var containerfolder = MANIPULATIONINFO['path']['containerfolder']

      var b1 = validation.checkOBJDefined( startpathlink,"UPLOADER Error checking defined startpathlink undefined UPLOAD() check");
      var b2 = validation.checkOBJDefined( containerfolder,"UPLOADER Error checking defined containerfolderTest undefined UPLOAD() check");

      if (b1 && b2){
        // var sqlline = `INSERT INTO ${TABLENAME}`
        var sqlline2 = `Select * from ${TABLENAME}`
        db.execute(sqlline2, [])
          .then(([rows, fields]) => {
              filenamepath = startpathlink + "/" + containerfolder + ID;
               var madepath = validation.makepath( filenamepath,"UPLOADER Error making path UPLOAD FUNCTION line 220-? filenamepath COULD not make.");
              if (madepath){
                var fileMap = MANIPULATIONINFO['FileMap']
                var path;
                var foldername;
                function loopFolderscallback(obj,keyo){

                  if (fileMap[keyo]) {
                    foldername = fileMap[keyo]
                    path = countfiles(path, foldername);
                      var path = validation.countfiles(path, foldername,"UPLOADER Error looping folders loopFolderscallback FUNCTION line 150-? countfiles COULD not run.");
                  }

                  if (obj.hasOwnProperty("64bit")) {
                    var fullfilepath = validation.storefiles(path, obj,"UPLOADER Error looping folders loopFolderscallback FUNCTION line 150-? storefiles COULD not run.");
                    if (fullfilepath !== null || fullfilepath !== undefined){
                      var fullfilepath = storefiles(path, obj)
                      obj.path = fullfilepath
                      console.log(obj.path)
                      obj["64bit"]=null
                      delete obj["64bit"]
                    }
                  };
                }
                var madefiles = validation.loopFolders( JSONDATA,loopFolderscallback,"UPLOADER Error looping folders UPLOAD FUNCTION line 220-? loopFolders COULD  notrun.");

                if (madefiles){
                  res.json({
                    "JSONDATA": {"DATA":JSONDATA,"MANIPULATIONINFO":MANIPULATIONINFO},
                    "ID": ID,
                    "datastripperObjs": req.body['datastripperObjs']
                  })
                }else{
                  res.json({"ERROR":"line 198 madefiles returned false upload"})
                }
              }
          }).catch((err) => {
            console.log(err)
            console.log("Table Does Not Exist")
          })
          // var storedfiles = validation.storefiles( JSONDATA,filenamepath,fileMap,"UPLOADER Error looping folders storefiles FUNCTION line 230-? storefiles COULD not run.");

      }else{
        return new Error("ERROR LINE 224 startpathlinkTest and containerfolderTest FAILED")
      }
    };


    // var madesqlid = validation.setSQLID( JSONDATA,filenamepath,fileMap,"UPLOADER Error setSQLID was not made FUNCTION line 230-? setSQLID COULD not run.");

  } else {
    console.log("NO permission")
    res.json({
      "message": "no permission to upload",
      "failed": true
    })
  }


}
