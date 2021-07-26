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

  constructor() { }

  ngOnInit() {
    console.log("options line16")
    console.log(this.data)
    console.log("options line18")
    console.log(this.control)




  }

}
