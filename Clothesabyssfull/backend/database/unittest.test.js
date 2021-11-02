//fake object
"use strict"

var db = require('../database');
var addproduct = require('./functions/addProduct');

var manipulationinfo = addproduct("somefolder");
var tablename = manipulationinfo['TABLENAME'];
var DBCheckTable = require('./DButilityfunctions/CHECKTABLEEXIST');
var MakeEmptyRow = require('./DButilityfunctions/MAKESQLID');
var countfiles = require('./utilityfunctions/countfiles');
var makepath = require('./utilityfunctions/makepath');
var deletePath = require('./utilityfunctions/deletePath');
var storefiles = require('./utilityfunctions/storefiles')
var image64bitExample = require('./utilityFiles/image64bitExample');



test('unit test one start', ()=>{
  expect(true).toBe(true)
})

// test('DBCheckTable takes tablename as param; Should return true', async ()=>{
// let res = await DBCheckTable(tablename)
//   expect(res).toBe(true)
// })
// //PRODUCTFORMS drop this table
// test('DBCheckTable takes tablename as param; Should return false', async ()=>{
// let res = await DBCheckTable("PRODUCTFORMSFWES")
//   expect(res).toBe(false)
// })


//
// test('MAKESQLID makes empty row with new id value', async ()=>{
// let res = await MakeEmptyRow(tablename, null);
//   expect(typeof res).toBe("object");
// })
//
// test('MAKESQLID makes empty row with new id value', async ()=>{
// let res = await MakeEmptyRow(tablename, null);
//   expect(typeof res === "number").toBe(true);
// })
//
// test('MAKESQLID makes empty row with new id value edit value provided', async ()=>{
// let res = await MakeEmptyRow(tablename, 3);
//   expect(res).toBe(3);
// })

// var containerfolder = manipulationinfo['containerfolder'];
// var fullpath = manipulationinfo['path'];
//
// var fake_imageObj = {
//   "64bit":image64bitExample(),
//   "image_structure":{
//     filename: "teamimg_square",
//     filesize: 3333,
//     filetype: "image/jpg",
//     height: 1000
//   }
// }

// test('making path returns bool', () => {
//   let res = makepath(fullpath);
//   expect(res).toBe(true);
// })
// // test('deleting path', () => {
// //   let res = deletePath(fullpath);
// //   expect(res).toBe(true);
// // })
// //
// test('count and make folders', () => {
//   var teststring =  fullpath + "/" + (containerfolder);
//   let res = countfiles(fullpath,containerfolder );
//   expect(res.includes(teststring)).toBe(true);
// })
// test('store a file', () => {
//   var testpath =  fullpath + "/" + (containerfolder)+"0";
//   var teststring = "/assets/productCatagories/productImages/somefolder/Product0/teamimg_square"
//   let res = storefiles(testpath,fake_imageObj );
//   expect(res.includes(teststring)).toBe(true);
// })
    // var sqlline = `select * from ${tablename}`; db.query(sqlline).then(([rows, fields]) => {
    //   console.log(rows)
    // }).catch((err) => {
    //   console.log(err)
    // })


    //table Person:fields[id,permissions,name,email,password];
    //table userdata:fields[userid,settings]


    //table products: fields[productid, productname ,date, COMPANYNAME, SHOWONSITE, SUBCATAGORY,TYPE,SUBCATAGORY,TITLE,PRODUCTCATAGORY,PARAGRAPHS,SPECIFICATIONS];

    //table VARIENTS: fields[specid, product:text]


    //if index tablemap then
    //put values in the table
    //foreach throw in table;

    /*
    DATA: '{"SHOWONSITE":true,"COMPANYNAME":"clothesabyss","TYPE":"mainslider","SUBCATAGORY":"foundationstick","PRODUCTNAME":"seomfowiefoi","TITLE":"sofinewonifwion","PRODUCTCATAGORY":"makeup","PARAGRAPHS":[{"PARAGRAPH":""}],"SPECIFICATIONS":[{"KEY":"","VALUE":""}],"MULTISETPRODUCTOPTIONS":false,"VARIENTS":[{"VARIENTINFO":{"MAINIMAGE":{"image_structure":{"width":4000,"height":3000,"filename":"GOPR0050.jpeg","filesize":3251260,"filetype":"image/jpeg"},"path":"/assets/productCatagories/productImages/makeup/product9/VARIENT0/GOPR00501627879952513.jpeg"},"SKU":"","INVENTORY":"2323","WEIGHT":"23","PRODUCTPRICE":"23.23","PRODUCTCONTENTS":"","PRODUCTSALEPRICE":"23.23"},"LOCATION":[{"LOCATIONFOUND":"wef","NAMEOFSTORE":"wefw"}],"OPTIONS":[{"KEY":"wfewef","VALUE":"wef"}],"IMAGEPAIR":[{"ADDIMAGE":{"image_structure":{"width":389,"height":342,"filename":"Screen Shot 2020-12-14 at 8.15.04 AM.png","filesize":162528,"filetype":"image/png"},"path":"/assets/productCatagories/productImages/makeup/product9/VARIENT0/Screen Shot 2020-12-14 at 8.15.04 AM1627879952518.png"}}]}]}',
           MANIPULATIONINFO: '{"FileMap":{"VARIENTS":"VARIENT","MULTISETPRODUCTS":"MULTISETPRODUCTS"},"TABLENAME":"PRODUCTFORM","TABLEID":"PRODUCTID","edit":null,"JSONFileIDMap":{"PRODUCTS":"PRODUCTID","VARIENTS":"SPECID"},"jsonFileStartKey":"PRODUCTS","JSONFILEURL":"src/assets/productCatagories/products.json","path":{"startpath":"src/assets/productCatagories/productImages/makeup","containerfolder":"product"}}'
    */











    setTimeout(function() {
      db.end()
    }, 30000)
    //
    // test('DBCheckTable takes tablename as param; Should return true', async ()=>{
    //   let res = await DBCheckTable("PRODUCTFORMS")
    //
    //   expect(res).toBe(false)
    // })
