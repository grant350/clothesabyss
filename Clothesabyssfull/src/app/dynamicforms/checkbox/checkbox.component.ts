import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, AfterViewInit {
  public fields: any;
  @Input() data: any;
  @Input() control: FormGroup;
  @Input() errorsfile: any;
  @Input() auth: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }
  public array = []
  public arraykeys = []
  public show = true;
  //if formgroup.errors is disabled:true then show = false


  //narrow code

  box(i) {


    for (let bool = 0; bool < this.data.groupFields.length; bool++) {


      var name = this.data.groupFields[bool].name
      this.control.patchValue({ [name]: false })
    }

    for (let bool = 0; bool < this.data.groupFields.length; bool++) {
      var name = this.data.groupFields[bool].name
      if (bool === i) {
        var name = this.data.groupFields[bool].name
        this.control.patchValue({ [name]: true })
      }
    }
    console.log(this.control.parent)

  }





  // selectedItems: number =0;
  // this is for selector limit do later note:
  // checkedState(event, checkBox) {
  //             if(event.target.checked === true){
  //               if(this.counter < 5){
  //               this.counter++
  //             }else{
  //                event.target.checked = false;
  //             }
  //             }else if(this.counter>0){
  //               this.counter--;
  //             }
  //         }

  ngOnInit() {
    // if (this.control.errors){
    //   this.show = this.control.errors.show
    // }


    console.log(this.control)
    this.arraykeys = Object.keys(this.control.controls)
    console.log(Object.keys(this.control.controls))
    // this.data.groupFields.forEach((opt:any)=>{
    //   if (opt.validation.set){
    //     this.array.push(true)
    //     this.control.patchValue({[opt.name]:true})
    //   }else{
    //     this.array.push(false)
    //     this.control.patchValue({[opt.name]:false})
    //   }
    // });
    // console.log(this.control)

  }
  ngAfterViewInit() {
    this.data.groupFields.forEach((opt: any) => {
      if (opt.validation.set) {
        this.array.push(true)
        this.control.patchValue({ [opt.name]: true })
        this.control.get(opt.name).updateValueAndValidity();
      } else {
        this.array.push(false)
        this.control.patchValue({ [opt.name]: false })
        this.control.get(opt.name).updateValueAndValidity();
      }
    });
    console.log(this.control)
    this.changeDetectorRef.detectChanges()
  }

}
