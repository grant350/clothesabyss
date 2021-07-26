import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { GETDATA } from '../../../../getData.service';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-global-edit-page',
  templateUrl: './global-edit-page.component.html',
  styleUrls: ['./global-edit-page.component.scss']
})
export class GlobalEditPageComponent implements OnInit {

public dataFormsDisplay:any;
public selectedValue:any;
public items=[];
public routechild:any;
constructor(private activatedRoute:ActivatedRoute, private gt: GETDATA) { }

//hookup db
//graphing
//producttlist searchbar
// mobile friendly
//productpage fix
//paypal api
//stripe Api
//launch v1

//fix fix fix fix fix fix fix
//selectedValue=SALESDATAFORM
//is param


// read params and input htat into

//from param get harddata
  retrieveData(selectedValue){




    var json={
//make a seperate json file
      "SALESDATAFORM":{
        "IMAGE": null,
        "SUMMARY": ["FIRSTNAME","LASTNAME","SPECID[]","DATE"],
        "ID": ["ID"]
      },
      "PRODUCTFORM":{
        "IMAGE": ["MAINIMAGE"],
        "SUMMARY": ["PRODUCTCATAGORY","PRODUCTPRICE","TITLE","SPECID[]"],
        "ID": ["PRODUCTID"]
      }
    };
    this.dataFormsDisplay = json[selectedValue]
//retrieve data from getdata service
// var maincookie = localStorage.getItem('products')
// if (!maincookie){
// this.gt.getProducts()
// maincookie = localStorage.getItem('products')
// console.log(maincookie)
//   try {
//      this.items=JSON.parse(maincookie)
//      console.log(this.items)
//      console.log(maincookie)
//
//    }
//    catch{
//      console.log("no parse")
//      this.items=null
//    }
// }else{
//
//   try {
//      this.items=JSON.parse(maincookie)
//      console.log(this.items)
//    }
//    catch{
//      console.log("no parse")
//      this.items=null
//    }
// }
// if (this.items === null || this.items.length <= 0){
//   this.error = "NO PRODUCTS TO SHOW"
// }
//




var za = this.gt.getData(selectedValue)
console.log(za)
var a = this.gt.getAuthListener()
console.log(a)
a.subscribe(z=>{
  console.log(z)
  this.items=JSON.parse(z)['data']
  console.log(this.items)

//talk to a girl everyweek and go on dates everyweek so that you can take the pain turn it into hard work.
//take anger and make it into something that everyone won't see coming.
// make a virus in bot for the people
//microwave + poison bugs kill all the humans.


  if (this.items[0].hasOwnProperty("DATA")||this.items[0].hasOwnProperty("data")){
    this.items.forEach(i=>{
      console.log(i)
 var newi = {};
      Object.keys(i).forEach(k=>{
        console.log(k)
        if (k.toLowerCase() === "data"){
          try{
            Object.keys(i[k]).forEach(key=>{
              if (i.hasOwnProperty(key) && false){
                console.log("skip")
              }else{
                i[key]=i[k][key]
              }
            })
          }catch{
            console.log("ERROR CHUCHU")
          }
        }
      })
      delete i['data']
      delete i['DATA']
      //doesnt do lowercase DATA
    })
    }

console.log(this.items)
})
// return localStorage.getItem(selectedValue)
  }





//()input  arrays and items



  ngOnInit() {


    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['selectedValue']){
        var p = params['selectedValue'].toString()
        this.retrieveData(p)
        this.routechild = p
      }
    // this.reloadTree()
    })


  }

}
