import { Component, OnInit, Input, ViewChildren, ViewChild, AfterContentInit,QueryList, ElementRef, Renderer2, OnChanges, Output } from '@angular/core';
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
export class FormarrayComponent implements AfterContentInit {
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
  constructor() {
//console.log(this.control)
  }

  arrow(index) {
    this.array[index] = !this.array[index];
  }



  AddGroup() {
    //console.log("ADDING GROUP")
    var copygroup: FormGroup = this.arrayofControls[0]
    ////console.log("copygroup")
    //////console.log(copygroup)
    var newGroup: FormGroup;
    if (copygroup instanceof FormGroup) {
      const formGroup = new FormGroup({}, copygroup.validator, copygroup.asyncValidator);
      const controls = copygroup.controls;
      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, cloneAbstractControl(controls[key]));
      })
      // formGroup.reset()
      formGroup.reset()
      this.arrayofControls.push(formGroup)
try{
  this.parent.updateValueAndValidity()
}catch{
  //console.log("cannot update parent")
  formGroup.updateValueAndValidity()

}

    }

  }

  DeleteGroup(index) {
    var controlsarray:any = this.arrayofControls
    controlsarray.splice(index, 1)
    this.arrayofControls = controlsarray
    this.control.get(this.data.name).removeAt(index)
  }

  ngAfterContentInit() {
    if (this.data.hide) {
    try {
      this.control.get(this.data.name).disable()
    }catch{
        //console.log("major error cannot disable")
    }
    }
    this.array.push(false);
    this.stringcontrol = JSON.stringify(this.control.value)
    var arrayitem;
    if (this.control instanceof FormArray === false && this.control instanceof Array === false) {
      arrayitem = this.control.get(this.data.name)
      ////console.log("arrayItem")
      ////console.log(arrayitem)
      //console.log("control formarray")
      //console.log(this.control)

    } else {
      //////console.log("COULD NOT ADD CONTROL TO FORMARRAY")
      this.parent = this.control
      this.control = this.control.parent
      //////console.log("THE CONTROL")
      arrayitem = this.control.get(this.data.name)
      // arrayitem.updateValueAndValidity()
      // this.parent.updateValueAndValidity()
    }
    //////console.log(arrayitem)
    //////console.log("arrayitem")
    this.arrayofControls = arrayitem.controls
    // //////console.log(this.arrayofControls)
    // //console.log(this.arrayofControls)
  }

}
