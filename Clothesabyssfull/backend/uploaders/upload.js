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

module.exports = (req, res, next) => {

  if (req.permissions.toLowerCase() === "admin") {
    var JSONDATA = req.body.MainJsonData
    var MANIPULATIONINFO = req.body.MANIPULATIONINFO
    var DATASTRIPPEROBJS = req.body.datastripperObjs
    var t1 = JSONDATA !== null && JSONDATA !== undefined;
    var t2 = MANIPULATIONINFO !== null && MANIPULATIONINFO !== undefined;
    var t3 = MANIPULATIONINFO['TABLENAME'] !== null && MANIPULATIONINFO['TABLENAME'] !== undefined;
    var t4 = MANIPULATIONINFO['TABLEID'] !== null && MANIPULATIONINFO['TABLEID'] !== undefined;

    var myPromiseA = new Promise((resolve, reject) => {
      if (JSONDATA.DATA || JSONDATA.data){
        try{
          JSONDATA=JSONDATA.DATA
        }catch{
          JSONDATA=JSONDATA.data
        }
      }

      if (MANIPULATIONINFO['edit'] !== undefined) {
        console.log("edit is not undefined")
      };
      if (t1 && t2 && t3 && t4) {
        resolve(true)
      } else {
        console.log("error line 43")
        resolve(false)
      }
    });
    var myPromiseB = myPromiseA.then((answer) => {
      console.log(answer)
      console.log(`LINE 58 answer ${answer}`)

      if (answer) {
        //check if table id and table name work
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
          //next
          //return rows colnames
          //test if file paths are ready
          return true

        } else {
          // if no table
          res.json({
            "ERRORMESSAGE": "TABLE DOES NOT EXIST",
            "ERRORLINE": "87",
            "status": "serverError",
            "cause": "tablename not found"
          })
          return false
        }
      } else {
        //if no answer
        res.json({
          "ERRORLINE": "125",
          "file": "upload.js",
          "cause": "NO JSONDATA && MANIPULATIONINFO",
          "status": "serverError"
        })
      }

    });

    var myPromiseC = myPromiseB.then((isActive) => {
      console.log(isActive)
      console.log(`isActive: ${isActive}`)

      if (isActive) {
        var SQLID = setSQLID()
        console.log(SQLID)
        return SQLID
      }

    }).then((id) => {
      // if files to upload else
      var a1 = MANIPULATIONINFO['path'] !== null && MANIPULATIONINFO['path'] !== undefined;
      var a2 = MANIPULATIONINFO['FileMap'] !== null && MANIPULATIONINFO['FileMap'] !== undefined;
      var a3 = MANIPULATIONINFO['JSONFileIDMap'] !== null && MANIPULATIONINFO['JSONFileIDMap'] !== undefined;

      if (a1 && id) {
        function checkFileMap(map, data) {
          try {
            var arrayofbools = []
            Object.keys(map).forEach(k => {
              if (data[k]) {
                arrayofbools.push(true)
              } else {
                arrayofbools.push(false)
              }
            })
            if (arrayofbools.indexOf(true) != -1) {
              if (arrayofbools.indexOf(false) != -1) {
                console.log("checkFileMap has true and false in array fix")
                return true
              } else {
                return true
              }
            } else {
              return false
            }
          } catch {
            console.log('ERROR ')
            return false
          }
        }

        function checkPath(pathobj) {
          return true
        }
        var fileMapbool = checkFileMap(MANIPULATIONINFO['FileMap'], JSONDATA);
        //set index id in sql table for edit when added data from data push;
        UPLOAD(MANIPULATIONINFO['TABLENAME'], id);
      } else {
        // send to to client

        // JSONDATA['MANIPULATIONINFO'] = MANIPULATIONINFO
        // console.log("43443")
        // console.log(JSONDATA)
        // {JSONDATA,"MANIPULATIONINFO":MANIPULATIONINFO}
        //
        res.json({
          "JSONDATA": {"DATA":JSONDATA,"MANIPULATIONINFO":MANIPULATIONINFO},
          "ID": id,
          "datastripperObjs": req.body['datastripperObjs'],
          "MANIPULATIONINFO": req.body['MANIPULATIONINFO']
        })
      }

      //var pathmade = checkPath(MANIPULATIONINFO['path']);
    });


    function UPLOAD(TABLENAME, ID) {
      console.log("UPLOADING")
      var sqlline = `INSERT INTO ${TABLENAME}`
      var sqlline2 = `Select * from ${TABLENAME}`
      console.log(`${sqlline}`)
      db.execute(sqlline2, [])
        .then(([rows, fields]) => {
          var startpathlink = MANIPULATIONINFO['path']['startpath']
          var containerfolder = MANIPULATIONINFO['path']['containerfolder']
          if (startpathlink && containerfolder) {
            filenamepath = startpathlink + "/" + containerfolder + ID;
            makepath(filenamepath)
            loopFolders(filenamepath)
          }
          console.log("43443")
          console.log(JSONDATA)
          res.json({
            "JSONDATA": {"DATA":JSONDATA,"MANIPULATIONINFO":MANIPULATIONINFO},
            "ID": ID,
            "datastripperObjs": req.body['datastripperObjs'],
            "MANIPULATIONINFO": req.body['MANIPULATIONINFO']
          })
        }).catch((err) => {
          console.log(err)
          console.log("Table Does Not Exist")
        })




      function makepath(astartpath) {
        if (fs.existsSync(astartpath)) {
          return true
        } else {
          fs.mkdirSync(astartpath, {
            recursive: true
          }, function(err) {
            //  console.log(err)
          })
          return true
        }
      }

      function countfiles(thepath, foldername) {
        var newcontainerpath;
        var newcontainerfolder;
        var value = foldername.match(/[1-9]/i)
        newcontainerfolder = foldername.replace(value, "")
        var files = fs.readdirSync(thepath)
        if (files.length > 1) {
          var filesarray = files.filter(file => file.includes(newcontainerfolder));
          var length = filesarray.length;
          newcontainerpath = thepath + "/" + (newcontainerfolder + length);
          makepath(newcontainerpath)
          return newcontainerpath
        } else {
          newcontainerpath = thepath + "/" + (newcontainerfolder + '0');
          makepath(newcontainerpath)
          return newcontainerpath
        }
      }

      function storefiles(fullpath, filedata) {
        var absoluteFilePath;
        if (fullpath) {
          var filedatabuf;
          var bufferfile;
          try {
            filedatabuf = filedata["64bit"].replace(/^data:image\/\w+;base64,/, "");
            bufferfile = Buffer.from(filedatabuf, 'base64')
          } catch {
            console.log("ERROR FILE CANNOT BE MADE FROM base64 LINE266")
          }
          var mimeValidator = {
            "image/png": ".png",
            "image/jpg": ".jpg",
            "image/jpeg": ".jpeg"
          };
          console.log(bufferfile)
          if (bufferfile) {
            if (mimeValidator[filedata.image_structure.filetype]) {
              var extension = mimeValidator[filedata.image_structure.filetype]
              var filename = filedata.image_structure.filename
              console.log(`filename ${filename}`)
              if (filename.includes(extension)) {
                filename = filename.replace(extension, "")
              }

              let dateTime = Date.now();
              console.log(dateTime);
              dateTime = dateTime.toString()
              if (extension) {
                absoluteFilePath = (fullpath + "/" + filename + dateTime + extension)
              } else {
                absoluteFilePath = (fullpath + "/" + filename + dateTime + extension)
              }
              fs.writeFile(absoluteFilePath, bufferfile, function(err) {
                console.log(err)
              });
              absoluteFilePath = absoluteFilePath.replace("src", "")
              console.log(absoluteFilePath)
            }
          } else {
            console.log("line189: No bufferfile")
          }
          filedata = {}
          filedata["64bit"] = ""
          delete filedata;
          console.log("absoluteFilePath LINE 197")
          console.log(absoluteFilePath)
          return absoluteFilePath
        }
      };

      function loopFolders(path) {
        var foldername;
        var fileMap = MANIPULATIONINFO['FileMap']
        Object.keys(JSONDATA).forEach((keyo, index) => {
          var selectedkeyobj = JSONDATA[keyo]
          if (selectedkeyobj.hasOwnProperty("64bit")) {
            var fullfilepath = storefiles(path, selectedkeyobj)
            console.log("FULLPATH")
            console.log(fullfilepath)
            selectedkeyobj.path = fullfilepath
            console.log(selectedkeyobj.path)
            delete selectedkeyobj["64bit"]
          }

          if (fileMap[keyo]) {
            foldername = fileMap[keyo]
            path = countfiles(path, foldername);
          }

          function superlooper(obj, getkey) {
            if (obj.hasOwnProperty("64bit")) {
              var fullfilepath = storefiles(path, obj)
              obj.path = fullfilepath
              delete obj["64bit"]
            }
            if (obj instanceof Array && !obj instanceof Object) {
              obj.forEach((item, sindex) => {
                superlooper(item)
              })
            }
            if (obj instanceof Object) {
              Object.keys(obj).forEach((key) => {
                superlooper(obj[key], key)
              })
            }
          }
          superlooper(selectedkeyobj, keyo)
        });
        return JSONDATA
      }


    };


    async function setSQLID() {
      var SQLID = null
      try {
        if (MANIPULATIONINFO['edit'] >= 1) {
          SQLID = MANIPULATIONINFO['edit']
        }
      } catch {
        console.log("NOT EDIT")
      }

      if (SQLID >= 1 && MANIPULATIONINFO['path']) {
        try {
          var rmdir = startpathlink + "/" + MANIPULATIONINFO['path']['containerfolder'] + SQLID
          fs.rmdirSync(rmdir, {
            recursive: true
          })
        } catch {
          console.log("error no filepath to remove")
        }
        return SQLID
      } else {
        //makeID

        //insert null to tablecells
        var sqlline = `SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = '${MANIPULATIONINFO['TABLEID'].toUpperCase()}' AND TABLE_SCHEMA='maindatabase'`;
        async function setCellsNull(tableName) {
          try {
            const query = `SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${tableName.toUpperCase()}' AND TABLE_SCHEMA='maindatabase';`;

            var SQLID = null
            let result = await db.execute(query).then(([rows, fields]) => {
              var z = []
              var v = []
              rows.forEach((i, index) => {
                console.log(i)
                if (index >= 1) {
                  z.push(i['COLUMN_NAME'])
                  v.push("null")
                }
              });
              var x = v.join(',')
              var insertempty = `INSERT INTO ${req.body['MANIPULATIONINFO']['TABLENAME']} (${z}) VALUES(${x})`

              var result2 = db.execute(insertempty).then(([rows, fields]) => {
                SQLID = rows['insertId'];
                console.log(SQLID)
                return SQLID
              }).catch(err => {
                console.log(err)
              })
              return result2;
            });
            console.log(`result ${result}`)
            console.log(result)
            SQLID = result
            if (result) {
              return SQLID;
            }
          } catch (err) {
            return false;
          }
        }


        var answer = await setCellsNull(MANIPULATIONINFO['TABLENAME'])
        return answer
      }

    }






    console.log(req.body)

  } else {
    console.log("NO permission")
    res.json({
      "message": "no permission to upload",
      "failed": true
    })
  }


}
