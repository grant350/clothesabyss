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
  public arrayImage=[];


  constructor(private http: HttpClient, public router: Router, private activatedRoute: ActivatedRoute,private ss:ServerService) {
 var _this = this
    function makeImage(){
      var path = '/assets/images/'
      var arrayOfImages = [
        'surboard1.png', 'superbeach.jpg', 'teamimg_square.jpg', 'Screen Shot 2021-02-15 at 7.58.28 AM.png', 'stuffs.png', 'productidea.png'
      ];



      var type={
        "jpg":"image/jpg",
        "jpeg":"image/jpeg",
        "png":'image/png'
      }


      function dataURItoBlob(path, img ) {
        var type={
          "jpg":"image/jpg",
          "jpeg":"image/jpeg",
          "png":'image/png'
        }
        var index=path.lastIndexOf('.')
        var ftype = path.slice(index).replace('.','');
        console.log(path)
        img= path.slice(0,index)

        var filetype = type[ftype];
        console.log(filetype)

        var xhr = new XMLHttpRequest()
        function imageExists(image_url) {
          var http = new XMLHttpRequest();
          http.open('HEAD', image_url, false);
          http.send();
          return http.status != 404;
        }

        var imageExistBool = imageExists(path)

        if (imageExistBool) {
           xhr.onload = (e) => {
            var blob = new Blob([xhr.response], { type: filetype })
            var url = URL.createObjectURL(blob)
            const reader = new FileReader()
            reader.readAsDataURL(blob)
             reader.onload = function() {

              var bit = reader.result
                   var ob = { "64bit": bit, "path":path, "image_structure": { "width":1000, "height": 1000, "filename": img, "filesize": 3333, "filetype": filetype } }
                   if (ob){
                     _this.arrayImage.push(ob)

                   }


            }
          }
        }
        xhr.open('GET', path)
        xhr.responseType = "arraybuffer"
        xhr.send()
      }
      arrayOfImages.forEach(img=>{
        dataURItoBlob(path+img,img)


      })
    }
    makeImage()
    console.log(this.arrayImage)
  }





GetArrayOfImages(){
  return this.arrayImage
}

  SignUpCodeView() {
    return this.AuthListeners.SignUpCodeView.asObservable();
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

  postConnnection(link, formdata, callback) {
      var datatoken = this.getCookie('DataToken')
      var headerss = {
        "Authorization": "Bearer " + datatoken,
        "content-type": "application/json"
      };
      this.http.post(link, formdata, { headers: headerss }).subscribe((serverData: any) => {
        callback(serverData)
      });
    }







// ADDDATA(datajson){
// console.log(datajson)
//  // var datatoken = this.getCookie('DataToken')
//  // if (datatoken){
//  //   var headerss = {
//  //     "Authorization": "Bearer " + datatoken,
//  //     "content-type": "application/json"
//  //   };
//  //   this.http.post("http://localhost:4201/filesUpload", datajson, { headers: headerss }).subscribe((serverData: any) => {
//  //     console.log(serverData)
//  //     this.addDataCallback(serverData)
//  //   });
//  // }
//
//
// }


  ADDDATA(formdatajson) {
    var id=false
      var edit=false;
    if (id && id !== null && id !== undefined){
       edit=true
    }

    var path = `src/assets/productCatagories/productImages/${formdatajson.PRODUCTCATAGORY}`
    this.postConnnection(
          "http://localhost:4201/dataPush", {
            "DATA": formdatajson,
            "EDIT":edit,
            "FUNCTION":"addProduct",
            "PARAMS":[path]
    }, function (received){
      console.log('success')
    });
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
