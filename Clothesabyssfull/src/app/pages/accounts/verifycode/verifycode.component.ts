import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import {FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';

import { FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../../server.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.scss']
})
export class VerifycodeComponent implements OnInit {
  public formitems:any = []
  emailcodegroup: FormGroup;

  constructor(private http: HttpClient ,private serverservice: ServerService, private router:Router,private location:Location) {
    this.emailcodegroup = new FormGroup({})
      this.emailcodegroup.addControl('code', new FormControl('', Validators.required));
    }



    ngOnInit() {

    }

    submit(forminfo){
      var forminfo = forminfo.value.code
      console.log(forminfo)
      console.log("submit")
    //  var bool = this.serverservice.verifyEmail(forminfo)


    }
cancel(){
this.router.navigate(['/pages/login']);
}



}
