import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import {FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';

import { FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../../server.service';

@Component({
  selector: 'app-verifyemailAdmin',
  templateUrl: './verifyemailAdmin.component.html',
  styleUrls: ['./verifyemailAdmin.component.scss']
})
export class VerifyemailAdminComponent implements OnInit {
  public formitems:any = []
  verifyemailAdmin: FormGroup;

  constructor(private http: HttpClient ,private serverservice: ServerService, private router:Router,private location:Location) {
    this.emailcodegroup = new FormGroup({})
      this.emailcodegroup.addControl('code', new FormControl('', Validators.required));
    }


    ngOnInit() {
    }


  cancel(){
  this.router.navigate(['/pages/login']);
  //remove password hash from session
  }

  submit(forminfo){
  var forminfo = forminfo.value.code
  console.log(forminfo)
  console.log("submit")

    this.serverservice.EmailCodeSender(forminfo)
  }
}
