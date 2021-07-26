import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../../server.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.scss']
})
export class PasswordChangerComponent implements OnInit {

public newpassword:FormGroup;
formvalue: any;

  constructor(private http: HttpClient, private serverservice: ServerService,  private location:Location) {
     this.newpassword = new FormGroup({})


    this.newpassword.addControl('password', new FormControl('', Validators.required));
    this.newpassword.addControl('retypepassword', new FormControl('', [Validators.required, this.passmatch.bind(this)]));
    console.log(this.newpassword)

  }
  ngOnInit() {

  }
  passmatch(control: FormControl): { [s: string]: boolean } {

    if (this.formvalue !== undefined || this.formvalue != null) {
      let a = this.newpassword.controls.password.status === "INVALID"
      let b = control.value !== this.formvalue.password
      if ( a || b  ) {
        console.log(a && b)
        return { 'nameforbid': true }
      }
  }
  else {
    return null;
  }

  }

submit(pass){

this.serverservice.passwordReset(pass)
this.serverservice.deleteCookie('localhash')


}


}
