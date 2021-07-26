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
  var data = req.body.MainJsonData
  var fileMap = req.body.MANIPULATIONINFO['FileMap']
  console.log(fileMap)
  console.log(fileMap)
  console.log(fileMap)
  console.log(fileMap)

  var startpathlink = req.body.MANIPULATIONINFO['path']['startpath']
  var containerfolder = req.body.MANIPULATIONINFO['path']['containerfolder']
  var TABLENAME= req.body.MANIPULATIONINFO['TABLENAME']
  var filename;
  var filenamepath;
  var ID;
  console.log(req.body['MANIPULATIONINFO']['edit'])


  if (req.permissions.toLowerCase() === "admin") {

    console.log("IN THE UPLOAD")

    console.log("EDIT line 27")
    console.log(req.body['MANIPULATIONINFO']['edit'])

    try {
      if (req.body['MANIPULATIONINFO']['edit'] >=1){
        ID = req.body['MANIPULATIONINFO']['edit']
      }

    }catch{
      console.log("NOT EDIT")
    }

    console.log(ID)
    if (ID >=1) {
      if (req.body['MANIPULATIONINFO']['edit'].filenamepath) {
        // var p = req.body['MANIPULATIONINFO']['edit'].filenamepath
        var rmdir = startpathlink + "/" + containerfolder + ID
        fs.rmdirSync(rmdir, {
          recursive: true
        })
      }
      createsqlId(TABLENAME, ID)

    }
    else {
      var table = CTE(req.body['MANIPULATIONINFO']['TABLENAME'])
      table.then((item) => {
        console.log("Items")
        console.log(item)
        var z = []
        var v = []
        item.forEach((i, index) => {
          console.log(i)
          //and colnmae not id
          if (index >= 1) {
            z.push(i['COLUMN_NAME'])
            v.push("null")
          }
        });
        //makesure sql AUTO_INCREMENT ison id column
        var x = v.join(',')
        var insertempty = `INSERT INTO ${req.body['MANIPULATIONINFO']['TABLENAME']} (${z}) VALUES(${x})`
        console.log(z)
        console.log(insertempty)

        db.execute(insertempty)
          .then(([rows, fields]) => {
            ID = rows['insertId'];
            createsqlId(req.body['MANIPULATIONINFO']['TABLENAME'], ID)
            console.log(ID)
          }).catch(err => {
            console.log(err)
          })
      }).catch(err => {
        console.log(err)
      })
    }



    function createsqlId(TABLENAME, ID) {
      var sqlline = `INSERT INTO ${TABLENAME}`
      var sqlline2 = `Select * from ${TABLENAME}`
      console.log(`${sqlline}`)
      db.execute(sqlline2, [])
        .then(([rows, fields]) => {


          if (startpathlink && containerfolder ){
            //check startpathlink if path exist and 
            filenamepath = startpathlink + "/" + containerfolder + ID;
            makepath(filenamepath)
            loopFolders(filenamepath)
          }

          console.log(req.body['MANIPULATIONINFO'])

          data['MANIPULATIONINFO'] = req.body['MANIPULATIONINFO']
          res.json({
            "data": data,
            "ID":ID,
            "postDataInfo":req.body['datastripperObjs'],
            "MANIPULATIONINFO":req.body['MANIPULATIONINFO']
          })
        }).catch((err) => {
          console.log(err)
          console.log("Table Does Not Exist")
        })
    }



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
            dateTime=dateTime.toString()
            if (extension) {
              absoluteFilePath = (fullpath + "/" + filename+dateTime +  extension)
            } else {
              absoluteFilePath = (fullpath + "/" + filename+dateTime +  extension)
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
      Object.keys(data).forEach((keyo, index) => {
        var selectedkeyobj = data[keyo]
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
      return data
    }
  } else {
    console.log("NO permission")
    res.json({
      "message": "no permission to upload",
      "failed": true
    })
  }


}
