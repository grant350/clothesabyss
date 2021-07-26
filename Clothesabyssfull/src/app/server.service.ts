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

export class ServerService {
  private signupobj: any;
  private loginobj: any;


  public user = {
    "idToken": null,
    "DataToken": null,
    "data": null,
    "role":null
  }

  public messageClientErrors:any;


  public AuthListeners: any = {
    "AdminEmailCodeView": new Subject<any>(),
    "UserView": new Subject<any>(),
    "AdminView": new Subject<any>(),
    "SignUpCodeView":new Subject<any>()
  }
  // public AdminCodeView
  //client login ajustments
  // public isverified: any;
  // private authstats: any;

  public loginErrors = new BehaviorSubject<any>({ "datamessage": "password or username not found" });

  public userdata2obj = new BehaviorSubject<any>({ "datamessage": "nouserinfo found" });
  public twoauthemailcode = new BehaviorSubject<any>(false);
  // public authstatusListener = new Subject<any>();
  public TWABOOL = false
  //public AdminCodeView = new Subject<boolean>();
  public RURL: String;
  //end


  constructor(private http: HttpClient, public router: Router, private activatedRoute: ActivatedRoute,private location:Location) {

  }

  //RENAME TO AUTHSERVICE


  init() {
    console.log("init")
    this.verify()
  }

  gettoken() {
    //  return this.user.access_token
  }

  AdminView() {
    return this.AuthListeners.AdminView.asObservable();
  }

  UserView() {
    return this.AuthListeners.UserView.asObservable();
  }

  AdminEmailCodeView() {
    return this.AuthListeners.AdminEmailCodeView.asObservable();
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
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
//fix domain to clothesabyss domain name

  verify() {
    var datatoken = this.getCookie('DataToken')

    console.log("datatoken")
    console.log(datatoken)
    localStorage.removeItem('userdata')

    if (datatoken) {
      console.log(datatoken)
      var headerss = {
        "Authorization": "Bearer " + datatoken,
        "content-type": "application/json"
      };
      this.http.post('http://localhost:4201/verifyDataToken', null, { headers: headerss }).subscribe((obj: any) => {
        console.log(obj.verified)
        if (obj.verified) {
          console.log(obj)
          this.user.data = obj.userdata
          console.log("userdata");

          localStorage.setItem('permissions',obj.role)
          localStorage.setItem('userdata',obj.userdata)
          var role = obj.role
          role=role.toLowerCase()

          if (role === "admin") {
            this.AuthListeners.AdminView.next(true)
          } else {
            this.AuthListeners.UserView.next(true)
          }
          //this.router.navigate(['/']);
        } else {
          console.log("verify logout")
          this.logout()
        }
      })
    }else{
      console.log("false")
      this.AuthListeners.UserView.next(false)
      this.AuthListeners.AdminView.next(false)


    }



  }

clearData(){
  localStorage.removeItem('permissions')
  localStorage.removeItem('userdata')
  this.deleteCookie("DataToken")
  Object.keys(this.user).forEach(k=>{
    this.user[k] = null
  })
  Object.keys(this.AuthListeners).forEach(listener=>{
    console.log(listener)
    this.AuthListeners[listener].next(false)
  })
}
//figure this out
  logout() {
    this.clearData()
    this.router.navigate(['']);
    return false;
  }






  //to update user profile body type aka height weight nav column
  accountspage_userdata(userinfo) {
    // this.http.post('http://localhost:4201/postUserdata', {
    //   "data": userinfo.data,
    //   "option": userinfo.option,
    //   "affected": userinfo.affected
    // }).subscribe((data: any) => {
    //   console.log(data);
    //   this.user.access_token = data.newhash
    // })
  }
  //reset password
  //try to merge these two function
  passwordReset(password) {
    // //needsfixing
    // this.user.password = password
    // this.http.post('http://localhost:4201/postUserdata', {
    //   "data": this.user,
    //   "option": "password",
    //   "affected": "password",
    //   "func": "passwordReset"
    // }).subscribe((SR: any) => {
    //   console.log(SR);
    //   this.router.navigate(['/'])
    // })
    // this.user.password = null
  }




errors(){
  console.log(this.loginErrors)
return this.loginErrors

}

  login(obj) {
    console.log(obj)
    console.log(obj["code"])
    this.loginobj = obj
    console.log(this.loginobj)

    var data={
      JSONData:this.loginobj
    }
      this.http.post(`http://localhost:4201/login`, data
    ).subscribe((returndata: any) => {
      console.log("returndata: login")

if (returndata){
  console.log(returndata)
  var that = this

  if (returndata.enterCode) {
    that.AuthListeners.AdminEmailCodeView.next(true)
    var message = "Please enter code from email"
    this.loginErrors.next({"datamessage":message})
  }

  console.log(returndata)
  if (returndata.DataToken) {
    document.cookie = `DataToken=${returndata.DataToken}; path=/;`;
    that.verify()
    this.router.navigate(['/']);

  }else{
    console.log("NO DATA TOKEN")
  //  var message = "login failed check username/password"
    //this.loginErrors.next({"datamessage":message})
    console.log(this.loginErrors)
  }
}else{
  console.log("Server Error")
  var message = "login failed check username/password"
  this.loginErrors.next({"datamessage":message})
  console.log(this.loginErrors)
}

},err => {console.log('HTTP Error:241 login', err)

var message = "Server failed cannot make request to login server"
this.loginErrors.next({"datamessage":message})
})
  }

}
