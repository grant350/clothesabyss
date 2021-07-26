import { Component, OnInit, Input, ViewChildren, ViewChild, QueryList, ElementRef, Renderer2, OnChanges, Output } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, ControlValueAccessor, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { customValidators } from '../../formfieldbuilder/customvalidators';
import { FormSubmitting } from '../../formsubmiting.service';
import { DataService } from '../../products.service';
import * as rawjson from '../../errorsmodule.json';
import { cloneAbstractControl } from './AddControl';


@Component({
  selector: 'app-formarray',
  templateUrl: './formarray.component.html',
  styleUrls: ['./formarray.component.scss']
})
export class FormarrayComponent implements OnInit {
  @Input() data: any;
  @Input() errorsfile: any;
  @Input() control: any;
  @Input() auth: any;
  public stringcontrol;
  public images = [];
  public status: any;
  public array: any = [];
  public arrayofControls: FormArray;
  public parent: any;
  constructor() { }

  arrow(index) {
    this.array[index] = !this.array[index];
  }



  AddGroup() {
    console.log("ADDING GROUP")
    var copygroup: FormGroup = this.arrayofControls[0]
    console.log("copygroup")
    //console.log(copygroup)
    var newGroup: FormGroup;
    if (copygroup instanceof FormGroup) {
      const formGroup = new FormGroup({}, copygroup.validator, copygroup.asyncValidator);
      const controls = copygroup.controls;
      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, cloneAbstractControl(controls[key]));
      })
      // formGroup.reset()
      formGroup.reset()
      formGroup.updateValueAndValidity()
      this.arrayofControls.push(formGroup)
      this.parent.updateValueAndValidity()
      //console.log("FORMGROUP")
      //console.log(this.parent)
    }

  }

  DeleteGroup(index) {
    var controlsarray:any = this.arrayofControls
    controlsarray.splice(index, 1)
    this.arrayofControls = controlsarray
    this.control.get(this.data.name).removeAt(index)
  }

  ngOnInit() {
    if (this.data.hide) {
      this.control.get(this.data.name).disable()
    }
    this.array.push(false);
    this.stringcontrol = JSON.stringify(this.control.value)
    var arrayitem;
    if (this.control instanceof FormArray === false && this.control instanceof Array === false) {
      arrayitem = this.control.get(this.data.name)
      console.log("arrayItem")
      console.log(arrayitem)
      console.log("control")
      console.log(this.control)

    } else {
      //console.log("COULD NOT ADD CONTROL TO FORMARRAY")
      this.parent = this.control
      this.control = this.control.parent
      //console.log("THE CONTROL")
      arrayitem = this.control.get(this.data.name)
      arrayitem.updateValueAndValidity()
    }
    //console.log(arrayitem)
    //console.log("arrayitem")
    this.arrayofControls = arrayitem.controls
    // //console.log(this.arrayofControls)
    // console.log(this.arrayofControls)
  }

}
