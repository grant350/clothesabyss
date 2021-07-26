import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { RequestOptions } from '@angular/http'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common/'
import { DataService } from './products.service';
import { ServerService } from './server.service';
import { BehaviorSubject, Subscription ,Subject,Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: "root" })

export class FormSubmitting {
  filesarrayObj = []
  imageGroups={}

  public AuthListeners = {
    "SignUpCodeView": new Subject<any>()
  }
  /*
  {"path":"/assets/productCatagory/womens/product#/varient1"}
  */
  constructor(private http: HttpClient, public router: Router, private activatedRoute: ActivatedRoute,private ss:ServerService) {
    //get token from dataservice
  }

  SignUpCodeView() {
    return this.AuthListeners.SignUpCodeView.asObservable();
  }


  setImageGroup(name,group) {
    this.imageGroups[name] = group
    console.log(this.imageGroups)
  }

  getImageGroup(name) {
    return this.imageGroups[name]
  }




  getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }



  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=localhost;`;
  }

  //SSL CERTIFICATE

  ProductServerData(jsondata) {
    console.log(jsondata);

    if (jsondata.data && jsondata.data !== null && jsondata.data !== undefined) {
      console.log("jsondata.data LINE:73")

      console.log(jsondata.data)
      this.postConnnection("http://localhost:4201/databasePush", jsondata, null)

    } else {
      "not json to submit"
    }
  }





  returndata(data) {
    return data
  }

  //change all cookies and auths next week

  postConnnection(link, formdata, serverDataType) {
      var datatoken = this.getCookie('DataToken')
      var headerss = {
        "Authorization": "Bearer " + datatoken,
        "content-type": "application/json"
      };
      this.http.post(link, formdata, { headers: headerss }).subscribe((serverData: any) => {
        console.log(serverData)
        this[serverDataType](serverData)
      });
    }




  KEYTOUPPERCASE(jsondata) {
    var arrayofkeys = Object.keys(jsondata)
    arrayofkeys.forEach((key, index) => {
      key = key.toUpperCase()
    })
    //not a deep loop
    console.log(jsondata)
    return jsondata;
    //loop all keys to uppercase for server
  }



addDataCallback(returninfo){
  console.log(returninfo);

  if (returninfo.data && returninfo.data !== null && returninfo.data !== undefined) {
    console.log("jsondata.data LINE:73")
    this.postConnnection("http://localhost:4201/databasePush", returninfo, null)
  } else {
    "not json to submit"
  }
}




ADDDATA(datajson){
//insert into DemoTable values(STR_TO_DATE('06-01-2019', '%m-%d-%Y'));
//change edit {"name":idname,"ID":index} to just the index edit = 32
console.log("datajson line 134 in ADDDATA")
console.log(datajson)
 //this.postConnnection("http://localhost:4201/filesUpload", datajson,"addDataCallback")

 var datatoken = this.getCookie('DataToken')
 if (datatoken){
   var headerss = {
     "Authorization": "Bearer " + datatoken,
     "content-type": "application/json"
   };
   this.http.post("http://localhost:4201/filesUpload", datajson, { headers: headerss }).subscribe((serverData: any) => {
     console.log(serverData)
     this.addDataCallback(serverData)
   });
 }


}







  addProduct(formdatajson,id) {

    var RemoveKeysForSQL = [
      "AGE",
      "MULTISET",
      "GENDERS",
      "MULTISETPRODUCTOPTIONS"
    ];

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
    var IDMAP = {
      "PRODUCTS":"PRODUCTID",
      "VARIENTS":"SPECID"
    }

localStorage.removeItem('products')
    var edit=null
    if (id && id !== null && id !== undefined){
       edit={"id":id,"name":"PRODUCTID"}
    }
    //make uppercase keys
    this.KEYTOUPPERCASE(formdatajson)
    //make files in server with the names connected to formdata
    var fileMap = {
      "VARIENTS": "VARIENT",
      "MULTISETPRODUCTS": "MULTISETPRODUCTS"
    };
      //path to store the files
    var path = `src/assets/productCatagories/productImages/${formdatajson.PRODUCTCATAGORY}`
    this.postConnnection(
      "http://localhost:4201/filesUpload", {
        "MainJsonData": formdatajson,

          "MANIPULATIONINFO":{
           "FileMap": fileMap,
            "TABLENAME":"PRODUCTFORM",
            "TABLEID":"PRODUCTID",
            "JSONFILEURL":"src/assets/productCatagories/products.json",
            "edit":edit,
            "jsonFileStartKey": "PRODUCTS",
            "path": {
              "startpath": path,
              "containerfolder": "product",
            }
          },
          "SQLINFO":{
            "JSONKeyRemover": RemoveKeysForJSON,
            "SQLKeyRemover": RemoveKeysForSQL,
            // "SQLVALUETYPES": SQLVALUETYPES,
            "JSONFileIDMap": IDMAP
            // "jsonFileStartKey": "PRODUCTS"
            // "JSONFILEURL":"src/assets/productCatagories/products.json"
          }

      },
      "ProductServerData")

  }







  addMapData(formdatajson,id) {
    var RemoveKeysForSQL = [];
    //to create table
    var SQLVALUETYPES = {
    }
    localStorage.removeItem('mapdata');
    var edit=null
    if (id && id !== null && id !== undefined){
       edit={"id":id,"name":"MAPID"}
    }

console.log("ADD MAP DATA FUNCTION ACTIVATED")

console.log(formdatajson)
console.log(id)

this.KEYTOUPPERCASE(formdatajson)
//make files in server with the names connected to formdata
var fileMap = {
};
var path = `src/assets/mapDATA`
this.postConnnection(
  "http://localhost:4201/filesUpload", {
    "MainJsonData": formdatajson,
      "MANIPULATIONINFO":{
       "FileMap": fileMap,
        "TABLENAME":"MAPUI",
        "TABLEID":"MAPID",
        "edit":edit,
        "path": {
          "startpath": path,
          "containerfolder": "PRODUCTIMAGE",
        }
      },
      "SQLINFO":{
        "SQLKeyRemover": RemoveKeysForSQL,
        "SQLVALUETYPES": SQLVALUETYPES,
      }

  },
  "ProductServerData")




  }




  signup(d) {
    var cookie = this.getCookie("tempTimeToken")
    delete d.PASSWORDMATCH
    var RemoveKeysForSQL = [
      "PASSWORDMATCH"
    ];
    var body = {
      "SQLKeyRemover": RemoveKeysForSQL,
      "JSONData": d,
      "TableName": "userbase",
      "tempTimeToken":null
    };

    if (cookie){
      body.tempTimeToken = cookie
    }
    this.postConnnection("http://localhost:4201/signup", body, "signup_returndata")
  }
  signup_returndata(databack) {

    if (databack.returnPage){
      console.log("userexist or failed")
      this.deleteCookie("tempTimeToken")
      this.router.navigate(['/pages/login'])
    }
    if (databack.codeFailed){
      console.log("code failed")
      this.deleteCookie("tempTimeToken")
      this.router.navigate(['/pages/signup'])
    }

    if (databack.tempTimeToken && !databack.tokenExpired) {
      this.AuthListeners.SignUpCodeView.next(true)
      document.cookie = `tempTimeToken=${databack.tempTimeToken}; domain=localhost;`;
    }
    if (databack.DataToken){
      this.deleteCookie("tempTimeToken")
        document.cookie = `DataToken=${databack.DataToken}; domain=localhost;`;
        var c = this.getCookie("DataToken")
        console.log(c)
        this.ss.verify()
        this.router.navigate(['/']);

    }


  }

}
