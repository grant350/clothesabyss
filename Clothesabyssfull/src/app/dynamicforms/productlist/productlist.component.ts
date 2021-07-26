import { Component, OnInit, Input, ChangeDetectionStrategy, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GETDATA } from '../../getData.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // this line

})
export class ProductlistComponent implements OnInit {
  //public products:any={}
  @Input() items: any;//arr data
  @Input() displaydataguide: any;
  //@Input() filtertypes: any;
  @Input() routechild:any;
  @Input() dataFormsDisplay:any;
  public results = []
  public JSON = JSON;
  public OBJECT = Object

  public tabledataDisplay: any;
  public displayObjects = [];

  //name of component


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private gt: GETDATA) {
  }

  ngOnInit() {
    //console.log(this.dataFormsDisplay)
    var items = this.items;
    var displayresults = {
      "IMAGE": null,
      "SUMMARY": {},
      "ID": null
    }
    var displaynames = Object.keys(displayresults)
    if (this.dataFormsDisplay) {
      //console.log(this.dataFormsDisplay)
      //console.log(this.dataFormsDisplay)
    }else{
      //console.log("ARRAYS DISPLAY GUIDE IS EMPTY LINE 56")
    }

    var _that = this
    function check(item, key, disname) {
      var type = typeof item
      var actualtype=null;
      //console.log(`before: ${key}`)
      if (key.includes("[]")){
        actualtype="ARRAY"
      key=  key.replace("[]","")
      }

      if (key.includes("{}")){
        actualtype="OBJECT"
        key=  key.replace("{}","")
      }

      key=  key.replace("[]","")
      key=  key.replace("{}","")
      //console.log(`after: ${key}`)
      if (item == null){
        item = ""
      }

      if (disname == "SUMMARY") {
        if (Array.isArray(item)) {
          if (!displayresults[disname].hasOwnProperty(key)) {
            displayresults[disname][key] = { "type": type, "val": item }
          }
        }

        if (item instanceof Object && !Array.isArray(item) ) {
          if (!displayresults[disname].hasOwnProperty(key)) {
            displayresults[disname][key] = { "type": type, "val": `${item}` }
          }
        }

        if (!(item instanceof Object) && !(Array.isArray(item))) {
          if (!displayresults[disname].hasOwnProperty(key)) {

            displayresults[disname][key] = { "type": type, "val": [`${item}`] }
          }else{
            //console.log("pushmore")
             if (actualtype === "ARRAY") {
               displayresults[disname][key]['val'].push(`${item}`)
            }
          }
        }
      } else {
        if (displayresults[disname] == null) {
          displayresults[disname] = item
        }
      }
    };

    function mainlooper(item, arrayname) {
      for (let key in item) {
          sublooper(item[key], key)
          //console.log(item[key])
      }
      function sublooper(item, key) {
        if (_that.dataFormsDisplay[arrayname].indexOf(key) !== -1 || _that.dataFormsDisplay[arrayname].indexOf(`${key}[]`) !== -1) {
          if (_that.dataFormsDisplay[arrayname].indexOf(`${key}[]`) !== -1){
            check(item, `${key}[]`, arrayname)
          }else{
            check(item, key, arrayname)
          }
        }
        if (Array.isArray(item)) {
          item.forEach(arritem => {
            sublooper(arritem, null)
          })
        }
        if (item instanceof Object && !Array.isArray(item)) {
          Object.keys(item).forEach(objitem => {
            sublooper(item[objitem], objitem)
          })
        }
      }
    }

    if (items.length > 0 ) {
      items.forEach(item => {
        Object.keys(_that.dataFormsDisplay).forEach(arrayofnames => {
          if (_that.dataFormsDisplay[arrayofnames] !== null && _that.dataFormsDisplay[arrayofnames] !== undefined){
            mainlooper(item, arrayofnames)
          }
        })
        _that.displayObjects.push(displayresults)
        console.log(_that.displayObjects)
        displayresults = {
          "IMAGE": null,
          "SUMMARY": {},
          "ID": null
        };

      })
    }

    //this.tabledataDisplay = displayresults

  }


  filter(items, filtertypes) { }


  DELETE(index) {
//change this it wont work it only works for deleting products
var idname = this.dataFormsDisplay['ID'][0]
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)
console.log(idname)

    //console.log("send confirmationmessage")
    //confirm confirmation messsage if yes contiue
    console.log(this.routechild)
    console.log(this.routechild)
    console.log(this.routechild)
    console.log(this.routechild)

    var confirmation = null
    var r = confirm("Would you like to Delete this product?");
    if (r == true) {
      this.gt.DeleteItem(this.routechild,index,idname)
    } else {
      //console.log("canceled product delete")
    }



  }
  EDIT(index) {
    //console.log(index)
    console.log("line 190 in product list")
    console.log(index)
    console.log(this.routechild)
    console.log(this.items)
    //ID could be PRODUCTID so figure that out
    var idname = this.dataFormsDisplay['ID'][0]
    console.log(idname)
    console.log(idname)

    var na = this.items.filter(i=>i[idname] == index)

    localStorage.setItem(`${this.routechild}`,JSON.stringify(na[0]));
    //console.log(`EDIT line 202`)
//console.log(this.items[index])

    this.router.navigate([`adminconsole/AUTHPAGES/DATAFORMS/GlobalAddPage/${this.routechild}`], { queryParams: { selectedValue:`${this.routechild}`,index:`${index}` } })
  }


  /*
  <div class="isarray" *ngIf=" checkArray(tabledataDisplay['SUMMARY'][a]) ">
    is array
    <ul>
      <li *ngFor="let subitem of tabledataDisplay['SUMMARY'][a]">{{subitem}}</li>
    </ul>
  <!-- <span style="display:block">{{a(s)}}:</span>
    <p>{{tabledataDisplay['SUMMARY'][a]}}</p> -->
  </div>

  <div class="isobject" *ngIf=" checkObject(tabledataDisplay['SUMMARY'][a]) ">
    is object
    <ul>
      <li *ngFor="let subitem of OBJECT.keys(tabledataDisplay['SUMMARY'][a])">{{tabledataDisplay['SUMMARY'][a][subitem]}}</li>
    </ul>
   <!-- //<span style="display:block">{{a(s)}}:</span>
    //<p>{{tabledataDisplay['SUMMARY'][a]}}</p> -->

  </div>



  <!-- if string -->
  {{a}}
  {{!checkObject(tabledataDisplay['SUMMARY'][a])}}
  <div class="isstring" *ngIf=" !checkObject(tabledataDisplay['SUMMARY'][a]) && !checkArray(tabledataDisplay['SUMMARY'][a])  ">
    is string
  <span style="display:block">{{a}}(s):</span>
    <p>{{tabledataDisplay['SUMMARY'][a]}}</p>
  </div>
  */



}
