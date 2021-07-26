import { Component, OnInit,OnDestroy,Input } from '@angular/core';
// import {SettingsModule} from '../../mainsettings.module'
import { DataService } from '../../../products.service';
import { ServerService } from '../../../server.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'hammerjs';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
@Component({
  selector: 'app-testaccountspage',
  templateUrl: './testaccountspage.component.html',
  styleUrls: ['./testaccountspage.component.scss']
})
export class TestaccountspageComponent implements OnInit,OnDestroy {
  public data: any;
  public userdataobj: any;
  public userdata:any;
  public sub:any;
  public orders:any;
  public settings: any = [];
  public changes:boolean = true;
  public view: any = {
    "title": "Account Settings",
    "viewdata": "nodata"
  };
public user:any;
  public rowitem:any;
  private newrowitem:any;
  constructor(private router:Router,private activatedRoute: ActivatedRoute, private dataservice: DataService, private ss: ServerService) {

  }



  formatLabel(value: any) {
      return Math.round(value) + '"';
  }

onChanges(type,event){
console.log(type)
console.log(event)
event.value = `${event.value}`
if (type === "height"){
  this.userdata.sidenav.height=event.value
}
if (type === "waist"){
  this.userdata.sidenav.waist=event.value
}
if (type === "shoe"){
  this.userdata.sidenav.shoe=event.value
}
if (type === "color"){
  this.userdata.sidenav.color=event.value
}
console.log(this.userdata)
}


ifSubmit(){
let x = JSON.stringify(this.rowitem)
let y = this.newrowitem

console.log(x !== y)
  if (x !== y){
    var postdata = this.userdata.userdata.sidenav=this.rowitem
   this.ss.accountspage_userdata({"data":postdata,
 "option":"userdata"})
  }
}

  viewclicked(viewname) {
    console.log(viewname)
     var userdataparsed =this.userdata
    if (userdataparsed){
    userdataparsed = userdataparsed;
    this.userdataobj = userdataparsed
    var dataobj;

    // this.view.viewdata = userdataparsed
    if (viewname) {
      if (viewname === "AccountSettings") {
        this.view.title = "Account Settings"
        this.router.navigate(['mainsettings'],{relativeTo:this.activatedRoute})

      }
      if (viewname === "Orders") {
        this.view.title = "Orders"
        this.router.navigate(['orders'],{relativeTo:this.activatedRoute})

      }
      if (viewname === "History") {
         this.view.title = "History"
         this.router.navigate(['history'],{relativeTo:this.activatedRoute})

       }
      this.view.viewdata = dataobj
    }
  }
  }
//
//
  ngOnInit() {
     this.userdata = JSON.parse(localStorage.getItem('userdata'))
    // this.userdata = JSON.parse(x)
    console.log(this.userdata)
  }
//    var data = JSON.parse(this.serverservice.user.data)
//
//
// this.newrowitem = JSON.stringify(this.rowitem)
// var path = "../../../assets/icons/"
// this.serverservice.getuserdata2().subscribe((x:any)=>{
//   if(x.maindata){
// this.userdata = x.maindata.userdata
// console.log(this.userdata)
// }
// this.viewclicked('AccountSettings')
// }
//
//
// getuserdata2().subscribe((x)=>{
//   console.log(x)
//   this.userdata = x
//   if (this.userdata){
//     console.log(this.userdata)
//     console.log(this.userdata)
//     console.log(this.userdata)
//
//   this.rowitem= {
//     "height": x.userdata.sidenav.height,
//     "waist": x.userdata.sidenav.waist,
//     "shoe": x.userdata.sidenav.shoe,
//     "color": x.userdata.sidenav.color
//   };
//   console.log(this.rowitem)
// }
// console.log(this.rowitem)
// })




  ngOnDestroy() {

  }
}
