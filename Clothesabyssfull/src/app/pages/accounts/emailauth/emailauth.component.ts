import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import {FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';

import { FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../../server.service';
@Component({
  selector: 'app-emailauth',
  templateUrl: './emailauth.component.html',
  styleUrls: ['./emailauth.component.scss']
})
export class EmailauthComponent implements OnInit {

    constructor(private http: HttpClient ,private serverservice: ServerService,private activatedRoute: ActivatedRoute,private location:Location,private router:Router) {

      }
      ngOnInit() {

      // this.router.navigate(['sendemailcode'],{relativeTo:this.activatedRoute})

      }
  eom(e){
  console.log(e)

  }



}
