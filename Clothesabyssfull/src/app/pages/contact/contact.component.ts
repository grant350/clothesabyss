import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../../products.service';
import { Observable } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common/'
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import {FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule,Validators} from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

public formitems:any = []

eom(e){
console.log(e)


}

  constructor() {
    let fields = [
      "first",
      "last",
      "phone",
      "email",
      "message"
    ];
    this.formitems = fields
    /*
    fields.forEach((obj)=>{
      this.formitems.push(obj)
    })
    */




  }

  ngOnInit() {
  }

}
