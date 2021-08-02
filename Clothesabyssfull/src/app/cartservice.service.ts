import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common/'
import { DataService } from './products.service';
import { BehaviorSubject, Subscription,Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: "root" })

export class CartService implements OnInit {
  public itemsCount = new Subject<any>();
  public two = this.itemsCount.asObservable();
  public data: any = { "productObjs": [] ,"subtotal":0}
  public array: any;
  public datap: any;
  private sub: Subscription;
  public count:number;
  private subtotal:any;
  //loop up the id if specexist remove thespec if empty remove id

  constructor(public dataservice: DataService, private http: HttpClient, public router: Router) {
    this.two.subscribe((data:any)=>{console.log(data)
console.log(data)
return data

    })
    this.itemsCount.next(0)

  }


  ngOnInit() {
  }







  types(type) {
    // type = type.toUpperCase()
    console.log(type)

    console.log(this.http.get('../assets/productCatagories/products.json').toPromise())
    var that = this
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let a = this.http.get('../assets/productCatagories/products.json', { headers }).toPromise().then((data: any) => {

      var dat = this.datap
      this.datap = data
      var x = this.box(type)
      return x
    });

    return a


  }

  box(reg) {
    console.log(reg)
    var func = reg.func
    var rtype = reg.type
    console.log(rtype)

    var arr;
    let that = this
    if (that.datap) {
      console.log(that.datap)
      switch (func) {
        case "random":
          that.array = that.sortByRandom()
          break;
        case "catagory":
          that.array = that.sortByCatagory(rtype)
          break;
        default: "specific"
          that.array = that.sortBySpecific(rtype)
      }
      console.log(that.array)
      console.log(that.array)

    }
    return that.array
  }

  getArray() {
    if (this.datap) {
      console.log(this.array)
      return this.array
    }
  }


  sortBySpecific(specific) {
    let that = this
    var type;
    console.log(that.datap)
if ( that.datap['PRODUCTS'][0].hasOwnProperty("data") ||  that.datap['PRODUCTS'][0].hasOwnProperty("DATA") ){
  try{
    type = that.datap['PRODUCTS'].filter( (objj)=> objj.DATA["TYPE"] === specific)
  }catch{
    type = that.datap['PRODUCTS'].filter( (objj)=> objj.data["TYPE"] === specific)
  }
}else{
  type = that.datap['PRODUCTS'].filter( (objj)=> objj["TYPE"] === specific)
}


    console.log(type)
    return type

  }

  sortByCatagory(catagory) {
    let that = this
    var type;
    console.log(that.datap)
if ( that.datap['PRODUCTS'][0].hasOwnProperty("data") ||  that.datap['PRODUCTS'][0].hasOwnProperty("DATA") ){
  try{
    type = that.datap['PRODUCTS'].filter( (objj)=> objj.DATA["CATAGORY"] === catagory)
  }catch{
    type = that.datap['PRODUCTS'].filter( (objj)=> objj.data["CATAGORY"] === catagory)
  }
}else{
  type = that.datap['PRODUCTS'].filter( (objj)=> objj["CATAGORY"] === catagory)
}


    console.log(type)
    return type
  }


  sortByRandom() {
    var cats = []
    var picked = []
    var sproducts;
    let that = this

    this.datap.productObjs.forEach((obj) => {
      var randomnum2 = Math.floor(Math.random() * this.datap.productObjs.length)
      cats.push(obj.catagory)
    })

    var randomnum = Math.floor(Math.random() * cats.length)

    var selectedCats = this.datap.product.filter(function(objj) {
      return objj.productCatagory === cats[randomnum];
    });
    sproducts = selectedCats
    var x = sproducts[Math.floor(Math.random() * sproducts.length)]
    picked.push(x)
    that.array = picked
    return picked

  }




  addToCart(ps, pobj) {
    var checkarray = this.data.productObjs.filter(function(obj) {
      return obj.productSpec === ps;
    });
    console.log(checkarray)
    if (checkarray.length <= 0) {
      this.data.productObjs.push(pobj)
    }
    this.getCount()
  }

  getItems() {

    return this.data.productObjs
  }

  getCount() {
    this.count = this.data.productObjs.length
    this.itemsCount.next(this.count)
  return this.two

  }


  clearCart() {
    this.data.productObjs = []

    this.getCount()

  }

  clearProduct(objspec) {
    var newarray = this.data.productObjs.filter(function(obj) {
      return obj.productSpec !== objspec;
    });
    this.data.productObjs = newarray;
    this.getCount()


  }

  updateInventory(obj) {
    this.data.productObjs = obj
    console.log(this.data.productObjs)

    this.getCount()

  }
  total( total ){
    this.subtotal= total
  }

  checkout() {
    this.data.subtotal = this.subtotal
      this.http.post('http://localhost:4201/api', this.data).subscribe( (res:any)=>{
        if (res.infoObj.bool === "true"){
          window.location.href = res.infoObj.route

        }
        console.log(res)
      })

  }



}
