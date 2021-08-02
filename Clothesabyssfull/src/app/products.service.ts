import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common/'
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';


@Injectable({ providedIn: "root" })

export class DataService {

  private thumbnails: any;
  private valuearray = {
    "options": []
  }
  private data:any = {};
  private prom = [];
  public AuthListener = new Subject<any>()

  getAuthListener() {
    return this.AuthListener.asObservable();
  }

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
}


  getJSON() {
console.log(this.data)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    var x = this.http.get('../assets/productCatagories/products.json',{headers})
x.subscribe(z=>{
  console.log("THIS IS A MESSAGE FROM LINE 40")
  console.log(z)
  if (z[0].data || z[0].DATA){
    try{
      z = z['PRODUCTS'].filter(i=> i.data['SHOWONSITE'] == true)
      console.log(z)
    }catch{
      console.log("items have no showonsite param")
    }

  }else{
    try{
      z = z['PRODUCTS'].filter(i=> i['SHOWONSITE'] == true)
      console.log(z)
    }catch{
      console.log("items have no showonsite param")
    }

  }

  this.AuthListener.next(z)
})
  return this.AuthListener





  }

  getMessages() {
    return this.http.get('./errorsmodule.json');
  }


  getJSON2() {
    return this.http.get('../assets/productCatagories/images.json');
  }






}
