
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



async function setSQLID() {
  // var SQLID = null
  // try {
  //   if (MANIPULATIONINFO['edit'] >= 1) {
  //     SQLID = MANIPULATIONINFO['edit']
  //   }
  // } catch {
  //   console.log("NOT EDIT")
  // }
  //
  // if (SQLID >= 1 && MANIPULATIONINFO['path']) {
  //   try {
  //     var rmdir = startpathlink + "/" + MANIPULATIONINFO['path']['containerfolder'] + SQLID
  //     fs.rmdirSync(rmdir, {
  //       recursive: true
  //     })
  //   } catch {
  //     console.log("error no filepath to remove")
  //   }
  //   return SQLID
  // } else {
  //
  //   //insert null to tablecells
  //   var sqlline = `SELECT COLUMN_NAME
  // FROM INFORMATION_SCHEMA.COLUMNS
  // WHERE TABLE_NAME = '${MANIPULATIONINFO['TABLEID'].toUpperCase()}' AND TABLE_SCHEMA='maindatabase'`;
  //   async function setCellsNull(tableName) {
  //     try {
  //       const query = `SELECT COLUMN_NAME
  //   FROM INFORMATION_SCHEMA.COLUMNS
  //   WHERE TABLE_NAME = '${tableName.toUpperCase()}' AND TABLE_SCHEMA='maindatabase';`;
  //
  //       var SQLID = null
  //       let result = await db.execute(query).then(([rows, fields]) => {
  //         var z = []
  //         var v = []
  //         rows.forEach((i, index) => {
  //           console.log(i)
  //           if (index >= 1) {
  //             z.push(i['COLUMN_NAME'])
  //             v.push("null")
  //           }
  //         });
  //         var x = v.join(',')
  //         var insertempty = `INSERT INTO ${req.body['MANIPULATIONINFO']['TABLENAME']} (${z}) VALUES(${x})`
  //
  //         var result2 = db.execute(insertempty).then(([rows, fields]) => {
  //           SQLID = rows['insertId'];
  //           console.log(SQLID)
  //           return SQLID
  //         }).catch(err => {
  //           console.log(err)
  //         })
  //         return result2;
  //       });
  //       console.log(`result ${result}`)
  //       console.log(result)
  //       SQLID = result
  //       if (result) {
  //         return SQLID;
  //       }
  //     } catch (err) {
  //       return false;
  //     }
  //   }
  //
  //
  //   var answer = await setCellsNull(MANIPULATIONINFO['TABLENAME'])
  //   return answer
  // }

}

function storefiles(fullpath, filedata) {
  // var absoluteFilePath;
  // if (fullpath) {
  //   var filedatabuf;
  //   var bufferfile;
  //   try {
  //     filedatabuf = filedata["64bit"].replace(/^data:image\/\w+;base64,/, "");
  //     bufferfile = Buffer.from(filedatabuf, 'base64')
  //   } catch {
  //     console.log("ERROR FILE CANNOT BE MADE FROM base64 LINE266")
  //   }
  //   var mimeValidator = {
  //     "image/png": ".png",
  //     "image/jpg": ".jpg",
  //     "image/jpeg": ".jpeg"
  //   };
  //   console.log(bufferfile)
  //   if (bufferfile) {
  //     if (mimeValidator[filedata.image_structure.filetype]) {
  //       var extension = mimeValidator[filedata.image_structure.filetype]
  //       var filename = filedata.image_structure.filename
  //       console.log(`filename ${filename}`)
  //       if (filename.includes(extension)) {
  //         filename = filename.replace(extension, "")
  //       }
  //
  //       let dateTime = Date.now();
  //       console.log(dateTime);
  //       dateTime = dateTime.toString()
  //       if (extension) {
  //         absoluteFilePath = (fullpath + "/" + filename + dateTime + extension)
  //       } else {
  //         absoluteFilePath = (fullpath + "/" + filename + dateTime + extension)
  //       }
  //       fs.writeFile(absoluteFilePath, bufferfile, function(err) {
  //         console.log(err)
  //       });
  //       absoluteFilePath = absoluteFilePath.replace("src", "")
  //       console.log(absoluteFilePath)
  //     }
  //   } else {
  //     console.log("line189: No bufferfile")
  //   }
  //   filedata = {}
  //   filedata["64bit"] = null
  //   filedata=null
  //   delete filedata;
  //   console.log("absoluteFilePath LINE 197")
  //   console.log(absoluteFilePath)
  //   return absoluteFilePath
  // }
};


function countfiles(thepath, foldername,err) {

  // var newcontainerpath;
  // var newcontainerfolder;
  // var value = foldername.match(/[1-9]/i)
  // newcontainerfolder = foldername.replace(value, "")
  // var files = fs.readdirSync(thepath)
  // if (files.length > 1) {
  //   var filesarray = files.filter(file => file.includes(newcontainerfolder));
  //   var length = filesarray.length;
  //   newcontainerpath = thepath + "/" + (newcontainerfolder + length);
  //   var madepath = makepath( newcontainerpath,"countfiles Error making path(newcontainerpath) countfiles FUNCTION  countfiles COULD not makepath.");
  //   if (madepath){
  //     return newcontainerpath
  //   }else{
  //     return new Error("cannot make path in countfiles. line 349")
  //   }
  // } else {
  //   newcontainerpath = thepath + "/" + (newcontainerfolder + '0');
  //   var madepath = makepath( newcontainerpath,"countfiles Error making path(newcontainerpath) countfiles FUNCTION  countfiles COULD not makepath.");
  //   if (madepath){
  //     return newcontainerpath
  //
  //   }else{
  //     return new Error("cannot make path in countfiles. line 359 end statment")
  //   }
  // };


}

function loopFolders(JSONDATA,call,err) {
  Object.keys(JSONDATA).forEach((keyo, index) => {
    var selectedkeyobj = JSONDATA[keyo]
    call(selectedkeyobj,keyo)
    function superlooper(obj, getkey) {
      call(obj,keyo)
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


//done

      function makepath(astartpath,err) {
        if (fs.existsSync(astartpath)) {
          return true
        } else {
          fs.mkdirSync(astartpath, {
            recursive: true
          }, function(err) {
             console.log(err)

          });
          if (fs.existsSync(astartpath)){
            fs.rmdirSync(astartpath, {
              recursive: true
            })
            return true
          }else{
            console.log(astartpath)
            console.log(err)
            return false;
          }
        }
      }


function turnKeysToCAP(zobj,err){

  var myFunc = function(myStr) {
      console.log('lamp shade');
      return myStr;
    }

    setTimeout(myFunc('Hello World'), 1500);

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
      turnKeysToCAP:turnKeysToCAP,
      makepath:makepath
  };
