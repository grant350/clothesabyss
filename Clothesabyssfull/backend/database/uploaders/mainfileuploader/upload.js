var userobj = {}
var db = require('../../../database');
var ttms = 1000 * 60 * 60 * 3;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var LOGINSECRET = process.env.LOGINSECRET;
var path = require('path')
var fs = require('fs');

var MAKESQLID =require('../../DButilityfunctions/MAKESQLID');

var DBCheckTable = require('../../DButilityfunctions/CHECKTABLEEXIST');
var DBCheckTableID= require('../../DButilityfunctions/CHECKTABLEID');
var deletePath = require('../../utilityfunctions/deletePath');
var fileObjectLoop = require('../../utilityfunctions/fileObjectLooper');
var makepath = require('../../utilityfunctions/makepath');
var removekeys = require('../../utilityfunctions/removeKeysJSON');
var ColumnMatcher = require('../../DButilityfunctions/ColumnMatcher');
var  GETCOLUMNS = require('../../DButilityfunctions/GETCOLUMNS');

module.exports = (req, res, next) => {
  var data = req.body['DATA']
  var manipulationinfo = req.body['MANIPULATIONINFO']
  var index = req.body['INDEX']

//setting index to 64;

    console.log("upload file")





//before continuing make sure to check all data obj is correct manipulation info
// check if sql insert columns match

if (index){
  //removepath of product0 ect.....
}






  var myPromiseA = new Promise(async (resolve, reject) => {

    var columns = await GETCOLUMNS( manipulationinfo['TABLEMAP'])
    console.log(columns)
    var ignorePatternMap=[]
    Object.keys(manipulationinfo['TABLEMAP']).forEach(key=>{
      ignorePatternMap.push(manipulationinfo['TABLEMAP'][key].name)
    })
    console.log('ignorePatternMap',ignorePatternMap)
    var matched = ColumnMatcher(data, columns, ignorePatternMap, manipulationinfo['ColumnMatcherIgnorePattern'])
    console.log(matched)
    if (matched){
    resolve(true)
  } else {
    return false
    reject(new Error('no data to work with'))
  }

  })

  var myPromiseB = myPromiseA.then(async (item)=>{
      let res = await DBCheckTable(manipulationinfo['TABLENAME'])
      // console.log(res)
      if (res){
        return true
      } else {
        return false
      }
  })

  var getid = myPromiseB.then( async (answer)=>{
    if (answer){
        // deletePath(manipulationinfo['path'])
        let res = await MAKESQLID(manipulationinfo['TABLENAME'],manipulationinfo['TABLEID'],index)
        if (res !== false){
          return res
        }else {
          return false
        }
    } else {
      return false
    }
  })

var loopOBJ = getid.then( (ID)=>{
  if (ID){
      // manipulationinfo['PATH']


    makepath(manipulationinfo['path'])
    let obj = fileObjectLoop(data, manipulationinfo['fileMap'], manipulationinfo['path'], manipulationinfo['containerfolder'],ID)
    console.log('sampleDataCapture');
    var d ={"returnobj":removekeys(obj,manipulationinfo['SQLKeyRemover']),"returnID":ID}
// var path = require('path');
//
//     fs.writeFile(path.join(__dirname, '../../utilityFiles/ExampleData.js'), JSON.stringify(d),function (err){
//       console.log("wrote file data ")
//       console.log(err)
//     })

    return d
  } else {
    return false
  }
})

return loopOBJ;
next()


}
