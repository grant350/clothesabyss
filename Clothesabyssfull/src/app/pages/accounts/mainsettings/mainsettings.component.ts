import { Component, OnInit, ViewChildren, OnDestroy, EventEmitter, ViewContainerRef, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ServerService } from '../../../server.service';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mainsettings',
  templateUrl: './mainsettings.component.html',
  styleUrls: ['./mainsettings.component.scss']
})
export class MainsettingsComponent implements OnInit, OnDestroy {
  private buttonpressed: any = false;
  private currentOption: any;
  private isotopes = 0
  public sub: any;
  public orders: any;
  public resets: any;

  userformdata: FormGroup;
  public obj: any = {
    "name": false,
    "email": false,
    "password": false,
    "username": false,
    "phone": false
  }

  public userdata: any;

  constructor(private activatedRoute: ActivatedRoute,private serverservice: ServerService,private router:Router,private http:HttpClient) {

  }

  cancel(option) {
    this.obj[`${option}`] = false
  }
  /*
  && this.userdata.canchange.firstname >0 &&
  this.userdata.canchange.lastname >0
  */
sendemailCode(formdata){
var email = formdata.controls['email'].value

  //this.serverservice.EmailCodeSender(email,'resetpassword')

}


  save(formdata, array) {
    if (formdata.controls[array[0]].status === "VALID"){

    console.log(this.resets[array[1]])
    this.userdata[array[0]] = formdata.controls[array[0]].value
    if (array[1]) {
      this.userdata[array[1]] = formdata.controls[array[1]].value
    }
    // console.log(formdata.controls)
    if (
      formdata.controls[array[0]].status === "VALID"
        && this.resets[array[0]] >= 1 ||
         formdata.controls[array[1]].status === "VALID" &&
         this.resets[array[1]] >= 1){
      this.obj.name = false
      this.obj.username = false
      this.obj.password = false
      this.obj.phone = false
      this.obj.email = false
      console.log("is valid")
      this.serverservice.accountspage_userdata({
        "data": this.userdata,
        "option": "userdata",
        "affected": array
      })
    }
  }
}



  dropdown(option) {
    this.isotopes += 1;
    console.log(this.obj)
    this.obj.name = false
    this.obj.username = false
    this.obj.password = false
    this.obj.phone = false
    this.obj.email = false
    this.obj[`${option}`] = null
    //  this.renderer.setStyle(ref.parentNode, "display", "none"  );

  }
  ngOnDestroy() {

  }

  ngOnInit() {
    this.userformdata = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('',
        Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('',
        Validators.required)
    });
    // this.serverservice.getuserdata2().subscribe((x: any) => {
    //   console.log(x.maindata.userdata)
    //   if (x.maindata) {
    //     this.resets = x.resets
    //     this.userdata = x.maindata
    //     this.orders = x.orders
    //   }
    //
    // })


  }
}
