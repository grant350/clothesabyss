
var fs = require('fs');
//var BufferList = require('bufferlist').BufferList;

// bl = new BufferList(),



var testimgsV1={

  "IMAGE":"src/assets/productCatagories/productImages/makeup/product2/Screen Shot 2020-12-14 at 8.15.04 AM1627878444429.png",
  "MAINIMAGE":"src/assets/productCatagories/productImages/makeup/product2/VARIENT0/GOPR00501627878444455.jpeg",
  "IMAGEPAIR":["src/assets/productCatagories/productImages/makeup/product2/VARIENT0/Screen Shot 2020-12-14 at 8.15.22 AM1627878444434.png"]
};



function getimgs(url){
try{
  return fs.readFileSync(url, {encoding: 'base64'})

}catch{
  console.log("IMAGE PATH null")
  return null
}

}

var sameplebody={
  CHOOSEOTHERPLATFORMS: "false",
  COMPANYNAME: "clothesabyss",
  IMAGE: {"64bit": getimgs(testimgsV1['IMAGE']), image_structure: {
    filename: "Screen Shot 2020-12-14 at 8.15.04 AM.png",
    filesize: 162528,
    filetype: "image/png",
    height: 342,
    width: 389
    }},
  MULTISETPRODUCTOPTIONS: "false",
  PARAGRAPHS: [{PARAGRAPH: ""}],
  PERSONNAME: {FIRSTNAME: "wfef", LASTNAME: "wefwe"},
  PRODUCTCATAGORY: "makeup",
  PRODUCTNAME: "somename",
  SHOWONSITE: "true",
  SPECIFICATIONS: [{KEY: "", VALUE: ""}],
  SUBCATAGORY: "somecat",
  TITLE: "sometitle etw",
  TYPE: "mainslider",
  VARIENTS: [
    {
    IMAGEPAIR: [
      {
        ADDIMAGE:{
        "64bit": getimgs(testimgsV1['IMAGEPAIR'][0]),
        image_structure: {
          filename: "GOPR0049.jpeg",
          filesize: 3392789,
          filetype: "image/jpeg",
          height: 3000,
          width: 4000}
      }
    }
      ],

    LOCATION: [
      {LOCATIONFOUND: "ebay",
      NAMEOFSTORE: "ebay"}
    ],
    OPTIONS: [{KEY: "height", VALUE: "width"}],
    VARIENTINFO: {
      BINLOCATION: "L0003F003S0003B0033333",
      COST: "234.23",
      INVENTORY: "32",
      MAINIMAGE: {
        "64bit": getimgs(testimgsV1['MAINIMAGE']),
         image_structure: {
        filename: "Screen Shot 2020-12-14 at 8.15.04 AM.png",
        filesize: 162528,
        filetype: "image/png",
        height: 342,
        width: 389
      }
    },
      PRODUCTCONTENTS: "",
      PRODUCTPRICE: "234.23",
      PRODUCTSALEPRICE: "94.34",
      SKU: "234234243",
      WEIGHT: "23"
    }
  }
  ]
}


formbuilderdataobj = {
  "FileMap": {
    "VARIENTS": "VARIENT",
    "MULTISETPRODUCTS": "MULTISETPRODUCTS"
  },
  "TABLENAME": "PRODUCTFORM",
  "TABLEID": "PRODUCTID",
  "edit": parseInt(this.index),
  "JSONFileIDMap": {
    "PRODUCTS": "PRODUCTID",
    "VARIENTS": "SPECID"
  },
  "jsonFileStartKey": "PRODUCTS",
  "JSONFILEURL": "src/assets/productCatagories/products.json",
  "path": {
    "startpath": "src/assets/productCatagories/productImages/",
    "containerfolder": "product",
  }
};


RemoveKeysForSQL = [
  "AGE",
  "MULTISET",
  "GENDERS",
  "CHOOSEOTHERPLATFORMS",
  "IMAGE",
  "PERSONNAME"

];

RemoveKeysForJSON = [
  "AGE",
  "MULTISET",
  "PERSONNAME",
  "IMAGE",
  "GENDERS",
  "BINLOCATION",
  "COST",
  "SUPPLIER",
  "MULTISETPRODUCTOPTIONS",
  "MANIPULATIONINFO",
  "CHOOSEOTHERPLATFORMS"

];

var keystripperSample = {
  "JSONKeyRemover": RemoveKeysForJSON,
  "SQLKeyRemover": RemoveKeysForSQL
};

var sendOBJ={"DATA":sameplebody,"KEYSTRIPPER":keystripperSample,"MANIPULATIONINFO":formbuilderdataobj}
// var upload = require('./upload');
// var req={}





//
//
// function testCase1(){
// console.log("correctINFO goingIn")
// req.permission = "admin"
//  req['body']=sendOBJ
// upload(req,res)
// }
//
// function testCase2(){
//   console.log("badINFO")
// }


// testCase1()







//************TESTING************//



function turnKeysToCAP(zobj,err){

 var con = checkOBJDefined(zobj,"turnkeystocap undefined")
if (con){
var mobj = {...zobj}
    Object.keys(mobj).forEach((keyo, index) => {
      function superlooper(obj, getkey) {
        if (Array.isArray(obj) ) {
          obj.forEach((item, sindex) => {
            superlooper(item,null)
          })
        }
        if (obj instanceof Object && !(Array.isArray(obj)) ) {
          Object.keys(obj).forEach((key) => {
            if (key == key.toUpperCase()){
            }else{
              obj[key.toUpperCase()]=obj[key]
              obj[key]=null
              delete obj[key]
            }
            superlooper(obj[key], key.toUpperCase())
          })
        }
      }
      superlooper(mobj, keyo)
    });
    return mobj
  }else{
    console.log(err)
    return false
  }
}






function checkOBJDefined(obj,error){
try {
  var bool1 = (JSON.stringify(obj).length > 1);
  var bool2 = (obj !== null && obj !== undefined);
  var bool3 = (typeof obj == "object" || obj.hasOwnProperty(Object.keys(obj)[0]));
  if (bool1 && bool2 && bool3){
    return true
  }else{
    console.log(error)
    return false
  }
}catch{
  console.log(error)
  return false
}

}

function checkIfDefinedVariable(vari,error){
  if (vari !== null && vari !== undefined ){
    return true
  }else{
    console.log(error)
  return false
  }
}


  //
  // test('variable is defined', ()=>{
  //   expect(checkIfDefinedVariable("admin")).toBe(true)
  // })






  module.exports = {
      checkIfDefinedVariable: checkIfDefinedVariable,
      checkOBJDefined: checkOBJDefined,
      turnKeysToCAP:turnKeysToCAP
  };
