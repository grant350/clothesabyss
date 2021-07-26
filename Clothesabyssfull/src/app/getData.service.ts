import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable, of } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common/'
import { DataService } from './products.service';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
@Injectable({ providedIn: "root" })

export class GETDATA {
  constructor(private http: HttpClient, public router: Router, private activatedRoute: ActivatedRoute,private location:Location) {}
  public AuthListener = new Subject<any>()

  getAuthListener() {
    return this.AuthListener.asObservable();
  }




      getCookie(name) {
        var cookieArr = document.cookie.split(";");
        console.log(cookieArr)
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




getData(tablename){

var _that = this

  function getConnnection(link,tn) {
      var datatoken = _that.getCookie('DataToken')
      console.log(datatoken)

      var headerss = {
        "Authorization": "Bearer " + datatoken,
        "content-type": "application/json"
      };
      _that.http.get(link, { headers: headerss }).subscribe((serverData: any) => {
        console.log(serverData)
        localStorage.setItem(tn,JSON.stringify(serverData))
        _that.AuthListener.next(JSON.stringify(serverData))
      });
    }
    getConnnection(`http://localhost:4201/getData?tablename=${tablename}`,tablename)

return   this.getAuthListener()
    if (localStorage.getItem(tablename)){
      console.log("SUCCCESS")
      return localStorage.getItem(tablename)
    }else{
      console.log("got nothing")
    }
}






getProducts(){
  //change this function to
  var datatoken = this.getCookie('DataToken')
  var headerss = {
    "Authorization": "Bearer " + datatoken,
    "content-type": "application/json"
  };
  this.http.get("http://localhost:4201/getData?tablename=PRODUCTINFO", { headers: headerss }).subscribe((serverData: any) => {
    console.log(serverData.data)
      var apple= JSON.stringify(serverData.data)
      console.log(apple)
      localStorage.setItem('products',apple)
    //  document.cookie = `productCookie=dwdwdwdw; domain=localhost;`;
  })

  return localStorage.getItem('products')
}



DeleteDataItem(index){

// console.log(`dataitem ${index}`)

}


DeleteItem(tablename,index,idname){
console.log(index)
console.log(tablename)
console.log(tablename)
console.log(tablename)
console.log(tablename)
console.log(tablename)

var datatoken = this.getCookie('DataToken')
var headerss = {
  "Authorization": "Bearer " + datatoken,
  "content-type": "application/json"
};
var startname = "PRODUCTS"
var sqlidname = "PRODUCTID"
// var containerfolder= "product"
localStorage.removeItem('products')

this.http.get(`http://localhost:4201/deleteData?tablename=${tablename}&index=${index}&idname=${idname}`, { headers: headerss }).subscribe((serverData: any) => {
  console.log(serverData)
  console.log("deleted product")
     window.location.reload()
})

this.deleteCookie(tablename);
}


postConnnection(link, serverDataType) {


    var datatoken = this.getCookie('DataToken')
    var headerss = {
      "Authorization": "Bearer " + datatoken,
      "content-type": "application/json"
    };
    this.http.post(link, { headers: headerss }).subscribe((serverData: any) => {
      console.log(serverData)
      this[serverDataType](serverData)
    });
  }

GetGraphs(){



}




}
