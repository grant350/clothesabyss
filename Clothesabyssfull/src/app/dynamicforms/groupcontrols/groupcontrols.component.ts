import { Component, OnInit, Input, ViewChildren, ViewChild, QueryList, ElementRef, Renderer2, OnChanges, Output } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, ControlValueAccessor, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { customValidators } from '../../formfieldbuilder/customvalidators';
import { FormSubmitting } from '../../formsubmiting.service';
import { DataService } from '../../products.service';
import * as rawjson from '../../errorsmodule.json';


@Component({
  selector: 'app-groupcontrols',
  templateUrl: './groupcontrols.component.html',
  styleUrls: ['./groupcontrols.component.scss']
})
export class GroupcontrolsComponent implements OnInit {

  @Input() data: any;
  @Input() errorsfile: any;
  @Input() control: FormGroup;
  @Input() auth: any;
  public subFormGroup:any;

  constructor(private fb: FormBuilder) {
  this.subFormGroup= this.fb.group({});
}

  ngOnInit() {
    this.subFormGroup = this.control.get(this.data.name)
    console.log(this.subFormGroup)
    if (this.data.hide) {
      try{
        this.control.get(this.data.name).disable()

      }catch{
        console.log("major error cant disable")        
      }

    }


  }


}
