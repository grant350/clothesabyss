import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() data: any;
  @Input() control: any;
  @Input() errorsfile: any;
  @Input() auth: any;
  public status:any;
  public opt:any;
  constructor() { }

updateValue(e,opt){
  // console.log(opt)
  // console.log(this.control.get(this.data.name).status)
  // console.log(e)
  this.control.value = e.target.value



}

  ngOnInit() {
    };



}
