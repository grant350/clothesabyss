import { Component, Input, OnInit, ViewChild, ChangeDetectorRef,ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormBuilder ,FormGroup,ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { GETDATA } from '../../../../getData.service';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})
export class ProductFormPageComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private gt:GETDATA) { }

  ngOnInit() {
    //remove PRODUCTFORM
    localStorage.removeItem("PRODUCTFORM")

  }








}
