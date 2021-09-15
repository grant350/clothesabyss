var RemoveKeysForSQL = [];
var RemoveKeysForJSON = [];



//get function name FUNCTION({})



module.exports = function (obj, path) {

  function KEYTOUPPERCASE(obj) {
    var arrayofkeys = Object.keys(jsondata)
    arrayofkeys.forEach((key, index) => {
      key = key.toUpperCase()
    })
    //not a deep loop
    console.log(jsondata)
    return jsondata;
    //loop all keys to uppercase for server
  }
  obj = KEYTOUPPERCASE(obj);

  RemoveKeysForSQL=['AGE',
    'MULTISET',
    'GENDERS',
    'MULTISETPRODUCTOPTIONS'
  ]

  RemoveKeysForJSON = [
    "AGE",
    "MULTISET",
    "GENDERS",
    "BINLOCATION",
    "COST",
    "SUPPLIER",
    "MULTISETPRODUCTOPTIONS",
    "MANIPULATIONINFO"
  ];

  var IDMAP = {
    "PRODUCTS": "PRODUCTID",
    "VARIENTS": "SPECID"
  }
  var fileMap = {
    "VARIENTS": "VARIENT",
    "MULTISETPRODUCTS": "MULTISETPRODUCTS"
  };


  var manipulationInfo =  {
    "fileMap": fileMap,
    "TABLENAME": "PRODUCTFORM",
    "TABLEID": "PRODUCTID",
    "JSONFILEURL": "src/assets/productCatagories/products.json",
    "edit": edit,
    "jsonFileStartKey": "PRODUCTS",
    "path": {
      "startpath": path,
      "containerfolder": "product",
    },
    "SQLINFO": {
      "JSONKeyRemover": RemoveKeysForJSON,
      "SQLKeyRemover": RemoveKeysForSQL,
      "JSONFileIDMap": IDMAP
    }
  };

}
