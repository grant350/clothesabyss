import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, Renderer2, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { customValidators } from '../../formfieldbuilder/customvalidators';
import { FormSubmitting } from '../../formsubmiting.service';
import { cloneAbstractControl } from './listformAddControl';
import { BehaviorSubject, Subscription ,Subject,Observable, of} from 'rxjs';
@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.scss']
})
export class ListFormComponent implements OnInit {
  @Input() data: any;
  @Input() errorsfile: any;
  @Input() control: any;
  @Input() auth: any;
  public formgroup: FormGroup;
  public mainFormArray: any;
  public array: any = [];
  public onarrayposition = 0;
  public arraycount = 0
  public arraycountSub = new BehaviorSubject<any>(this.arraycount);
  public onarraypositionSub = new BehaviorSubject<any>(this.onarrayposition);
  public onarray: any;
  public controlcopy: any;
  public valuecopy: any;
  public imageGroup = {};
  public myjson= JSON;
  public Object = Object;
  public formActive = true
  public arrayControls = []
  public singlecontrolenable=true

  public observerOnArray=new Subject<any>()

  constructor(private fb: FormBuilder, private fs: FormSubmitting, private http: HttpClient) {

  }



  //edit the form using onarray meaning which form you are edititng

  sub(){
      return this.observerOnArray.asObservable();
  }


  removeSelectedForm(position) {
    var a = this.control.get(this.data.name).controls
    //console.log(position)
    if (position >= 1) {
      a.splice(position, 1)
    }
    this.onarrayposition = 0
    this.arraycount = 0

  }

  editSelectedForm(position) {

    var a = this.control.get(this.data.name).controls
    this.onarray = this.arrayControls[position]
    this.onarrayposition = position
    this.arraycount = position


  }

  addVarient(cont) {
    this.arraycount += 1
    var mainFormGroup: FormArray = this.control.get(this.data.name)
    var a = this.control.get(this.data.name).controls
    var addvarient: any = mainFormGroup.controls[0]
    var newvarientObject: FormGroup = this.fb.group({})
    var a = cloneAbstractControl(addvarient)
    mainFormGroup.push(a)
    this.array = []
    var temparray = [];
    var item: any = mainFormGroup.controls[this.arraycount]
    Object.keys(item.controls).forEach((key) => {
      this.array.push(false)
      item.controls[key].reset()
      temparray.push(item.controls[key])
    });
    this.arrayControls.push(temparray);
    this.onarray = this.arrayControls[this.arraycount];
    this.control.get(this.data.name).updateValueAndValidity();

  }



  clicks(a) {}




  arrow(index) {
    this.array[index] = !this.array[index];
  }


  removeControl(arrayitem, index, gi) {
    setTimeout(() => {
      arrayitem.controls.splice(gi, 1)
      arrayitem.value.splice(gi, 1)
    }, 500)

  }


  addControl(arrayitem, index) {

    var value = arrayitem.value[0]
    var newobj = {}
    var formgroup = this.fb.group({})
    Object.keys(value).forEach((key) => {
      newobj[key] = ""
    })
    this.data.multiformControls[index].groupFields.forEach((field) => {

      if (Object.keys(value).indexOf(field.name) !== -1) {
        if (field.validation) {
          if (field.validation.required) {
            //switch

            if (field.validation.customValidator) {
              switch (field.validation.customValidator) {
                case "generalValidator":
                  formgroup.addControl(field.name, this.fb.control('', [Validators.required], [customValidators.generalValidator.bind(this, field.validation)]))
                  break;
                case "imageValidator":
                  formgroup.addControl(field.name, this.fb.control(null, [Validators.required], [customValidators.imageValidator.bind(this, field.validation)]))
                  break;
                case "checkboxValidator":
                  formgroup.addControl(field.name, this.fb.control('', [customValidators.checkboxValidator.bind(this, field.validation)]))
                  break;
              }
            }
            else {
              formgroup.addControl(field.name, this.fb.control('', Validators.required))
            }


          }
          else {
            formgroup.addControl(field.name, this.fb.control(''))
          }
        } else {
          formgroup.addControl(field.name, this.fb.control(''))

        }
      }
    });

    arrayitem.value.push(newobj)
    arrayitem.controls.push(formgroup)

  }





  ngOnInit() {
    if (this.data.hide !== null || this.data.hide !== undefined) {

      if (this.data.hide) {
        try {
           this.control.get(this.data.name).disable()
        }catch{
          // console.log("major error could not disable")
        }
      }

    }
      try {


        if (this.control.get(this.data.name).controls !== undefined || this.control.get(this.data.name).controls !== null) {
          var a = this.control.get(this.data.name).controls[0]

          var temparray = [];
          Object.keys(a.controls).forEach((key) => {
            this.array.push(false)
            temparray.push(a.controls[key])
          });
          this.arrayControls.push(temparray)

          this.observerOnArray.next(this.arrayControls[this.arraycount])

          this.onarray = this.arrayControls[this.arraycount]
        }
      } catch{

        //console.log("MAJOR ERROR IN LISTFORM 313")
      }


    }


  }
