
module.exports = function (varpath) {

  var RemoveKeysForSQL = ['AGE',
    'MULTISET',
    'GENDERS',
    'MULTISETPRODUCTOPTIONS',
    'CHOOSEOTHERPLATFORMS',
    'IMAGE'
  ]

  var RemoveKeysForJSON = [
    "AGE",
    "MULTISET",
    "GENDERS",
    "BINLOCATION",
    "COST",
    "SUPPLIER",
    "MULTISETPRODUCTOPTIONS",
    "MANIPULATIONINFO"
  ];

   /* number loop coutnts the keys; varients Foreach (specid1 , specid2) so and so on. it adds a key for the occurance of others;
   */
  var IDCounter = {
    "PRODUCTS": "PRODUCTID",
    "VARIENTS": "SPECID"
    //delete this
  }

   // when [key] = "VARIENTS" it makes folder called VARIENT. only if files exist
  var fileMap = {
    "VARIENTS": "VARIENT",
    "MULTISETPRODUCTS": "MULTISETPRODUCT"
  };

  //[name of tablename , dataformat in columns or as whole string obj];
  var tableMap = {"MAIN":{"name":"PRODUCTS","type":"columns","IDNAME":"PRODUCTID"},"VARIENTS":{"IDNAME":"SPECID","name":"VARIENTS","type":"dataobj",'dataobjName':'PRODUCT'}}
//  var tableMap = {"MAIN":["Products","dataobj"],"VARIENTS":["VARIENTS","dataobj"]}


  var manipulationInfo =  {
    "ColumnMatcherIgnorePattern":["CHOOSEOTHERPLATFORMS","MULTISETPRODUCTOPTIONS"],
    "fileMap": fileMap,
    "TABLEMAP":tableMap,
    "TABLENAME": "PRODUCTS",
    "TABLEID": "PRODUCTID",
    "JSONFILEURL": "src/assets/productCatagories/products.json",
    "jsonFileStartKey": "PRODUCTS",
    "path": 'src/assets/productCatagories/productImages/'+varpath,
    "containerfolder":'Product',
      "JSONKeyRemover": RemoveKeysForJSON,
      "SQLKeyRemover": RemoveKeysForSQL,
      "IDCounter": IDCounter
  };
  return manipulationInfo;
}
