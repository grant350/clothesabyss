//fake object
"use strict"

var db = require('../database');
var addproduct = require('./functions/addProduct');
var manipulationinfo = addproduct("somefolder");

//sampledata os what is done with uploader
var SampleData = require('./utilityFiles/ExampleData');



var  MakeSqlString = require('./DButilityfunctions/writeToDatabase');
var AddToJSONFile = require('./DButilityfunctions/writeToJSONFile');
var RemoveAddJSONData = require('./DButilityfunctions/removeAddJSONData');
var removekeysJSON = require('./utilityfunctions/removekeysJSON');
var getRowData = require('./DButilityfunctions/GETROWINFO');
var ColumnMatcher = require('./DButilityfunctions/ColumnMatcher');
var  GETCOLUMNS = require('./DButilityfunctions/GETCOLUMNS');
var RemoveSQLData = require('./DButilityfunctions/removeSQLData');
// console.log('sampledata',SampleData())


console.log('UNITTEST RUNNNING 2.0')



test('true is true',  ()=>{
  // console.log(manipulationinfo['JSONKeyRemover']);
  // console.log(manipulationinfo['SQLKeyRemover']);
  //
  // console.log(jsondataObject)
  // console.log(sqldataObject)
  expect(true).toBe(true)
})




//deletePaths()

//



var columns;
var candelete = false
// test('get columnNames', async ()=>{
//   var ID = 99;
//    columns = await GETCOLUMNS( manipulationinfo['TABLEMAP'])
//   expect(GETCOLUMNS.length >= 1).toBe(true)
// });
//
//
//    test('columnName should have same keys as dataObj', async ()=>{
//      var ignorePatternMap=['VARIENTS','PRODUCTS']
//     var matched = ColumnMatcher(SampleData()['returnobj'],columns, ignorePatternMap, manipulationinfo['TABLEMAP'])
//     if (matched){
//       candelete = true
//     }
//     expect(matched).toBe(true)
//   })
//
//
//   test('if JSON key remover exist', ()=>{
//     var newJSONObject;
//     var testdata = SampleData()['returnobj'];
//     testdata['AGE']=16
//     if (manipulationinfo['JSONKeyRemover']){
//       newJSONObject = removekeysJSON(testdata,manipulationinfo['JSONKeyRemover'])
//     }
//    expect(newJSONObject.hasOwnProperty('AGE')).toBe(false)
//  })
//
//
//    test('if  SQL key remover  exist', ()=>{
//      var newSQLObject;
//      var testdata = SampleData()['returnobj'];
//      testdata['GENDERS']="male"
//      if (manipulationinfo['SQLKeyRemover']){
//        newSQLObject = removekeysJSON(testdata,manipulationinfo['SQLKeyRemover'])
//      }
//     expect(newSQLObject.hasOwnProperty('GENDERS')).toBe(false)
//   })



  // test('removing JSON data from file', ()=>{
  // var answer = false
  //   if (manipulationinfo['JSONFILEURL'] && manipulationinfo['jsonFileStartKey']){
  //     var url = manipulationinfo['JSONFILEURL'];
  //     var startkey = manipulationinfo['jsonFileStartKey'];
  //     var tableidname = manipulationinfo['TABLEID'];
  //      answer =  RemoveAddJSONData(url,startkey, tableidname, 3);
  //      console.log(answer)
  //
  //   }
  //   expect(answer).toBe(true)
  // })




//
//   test('get row data', async ()=>{
//     var ID = 99;
//      rowdata = await getRowData(ID, manipulationinfo['TABLEMAP'])
//     expect(rowdata.length >= 1).toBe(true)
//   })
// //return data
//



    setTimeout(function() {
      db.end()
    }, 30000)
    //
    // test('DBCheckTable takes tablename as param; Should return true', async ()=>{
    //   let res = await DBCheckTable("PRODUCTFORMS")
    //
    //   expect(res).toBe(false)
    // })
