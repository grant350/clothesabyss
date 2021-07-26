import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import {FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,Validators} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  public formitems:any = []
  public auth: any = false;
  private sub: any;
public errormessage:any;
  logingroup: FormGroup;

    constructor(private http: HttpClient ,private serverservice: ServerService) {




      this.logingroup = new FormGroup({})

        this.logingroup.addControl('USERNAME', new FormControl('', Validators.required));
        this.logingroup.addControl('PASSWORD', new FormControl('', Validators.required));
        this.logingroup.addControl('CODE', new FormControl('', Validators.required));
}
      ngOnInit() {
       this.sub = this.serverservice.AdminEmailCodeView().subscribe( (x)=>{
          console.log(x);
          this.auth = x
        })
      }

  eom(e){
  console.log(e)

  }

  submit(forminfo){
    var forminfo = forminfo.value
    console.log(forminfo)

  this.serverservice.login(forminfo)
  this.serverservice.errors().subscribe((s)=>{
    console.log(s)
    if (s){
      this.errormessage = s.datamessage
    }
  })

console.log("submit")
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
