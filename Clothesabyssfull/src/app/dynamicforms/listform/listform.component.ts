import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, Renderer2, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Subscription } from 'rxjs';
import { customValidators } from '../../formfieldbuilder/customvalidators';
import { FormSubmitting } from '../../formsubmiting.service';
import { cloneAbstractControl } from './listformAddControl';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.scss']
})
export class ListFormComponent implements OnInit, OnChanges {
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
  public imageArray: any = []
  public controlcopy: any;
  public valuecopy: any;
  public imageGroup = {};
  public myjson= JSON;
  public Object = Object;
  public formActive = true
  public arrayControls = []
  public singlecontrolenable=true
  constructor(private fb: FormBuilder, private fs: FormSubmitting, private http: HttpClient) {

  }

  ngOnChanges(changes) {
    //console.log(changes)

  }

  //edit the form using onarray meaning which form you are edititng

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
    console.log(this.onarray)
    this.singlecontrolenable = false;
    this.singlecontrolenable = true;



  }

  addVarient(cont) {
    this.arraycount += 1
    var mainFormGroup: FormArray = this.control.get(this.data.name)
    var a = this.control.get(this.data.name).controls
    var addvarient: any = mainFormGroup.controls[0]
    console.log("ADDV")
    console.log(addvarient)

    var newvarientObject: FormGroup = this.fb.group({})
    var a = cloneAbstractControl(addvarient)
    console.log("A :71")
    mainFormGroup.push(a)
    console.log(a)
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
    this.singlecontrolenable = false;
    this.singlecontrolenable = true;

  }



  clicks(a) {
    //console.log(a)
  }




  arrow(index) {
    this.array[index] = !this.array[index];
  }


  removeControl(arrayitem, index, gi) {
    setTimeout(() => {
      // update your data

      //this.imageArray.splice(gi, 1)
      //console.log(arrayitem.controls)
      arrayitem.controls.splice(gi, 1)
      //console.log(arrayitem.controls)
      arrayitem.value.splice(gi, 1)
    }, 500)

  }


  addControl(arrayitem, index) {

    //console.log(arrayitem)
    //console.log(index)

    var value = arrayitem.value[0]
    var newobj = {}
    var formgroup = this.fb.group({})
    Object.keys(value).forEach((key) => {
      newobj[key] = ""
      //console.log(newobj[key])
      //console.log(key)
      //console.log(this.data.controls[index])
      //console.log(index)
    })
    this.data.controls[index].groupFields.forEach((field) => {
      //console.log(field)

      //console.log(field.name)
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


  dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  onImagePick(e, zi, cardname, controlpick, type) {


    var ncont = this.control.get(this.data.name).controls[this.arraycount].controls['array']
    const file = (e.target).files[0]
    //console.log(e.target)

    const reader = new FileReader();
    reader.readAsDataURL(file)


    reader.onload = (e) => {
      var img: any = new Image;
      var url = e.target.result;
      img.src = e.target.result;
      if (type === 'array') {

        if (this.imageGroup[cardname] instanceof Array && this.imageGroup[cardname]) {

          if (this.imageGroup[cardname][zi]) {
            this.imageGroup[cardname].splice(zi, 1, reader.result)
          }
          else {
            this.imageGroup[cardname].push(reader.result)
          }
        } else {
          this.imageGroup[cardname] = []
          this.imageGroup[cardname].push(reader.result)
          //console.log(this.imageGroup[cardname])
          //console.log(this.imageGroup[cardname])
          //console.log(this.imageGroup[cardname])
          //console.log(this.imageGroup[cardname])

        }

        //console.log(this.imageGroup)

      } else {
        //console.log(this.imageGroup)
        this.imageGroup[cardname] = reader.result
        //console.log(this.imageGroup)
      }
      // var imagefile = this.dataURItoBlob(reader.result) //blob
      var keyexist = false

      img.onload = function() {
        //console.log(img.width)
        //console.log(img.width)
        //console.log(img.width)
        //console.log(img.width)
        //console.log(file.name)
        //console.log(file.size)
        //console.log(file.type)
        var ob = { "64bit": reader.result, "image_structure": { "width": img.width, "height": img.height, "filename": file.name, "filesize": file.size, "filetype": file.type } }
        //set value to this ob
        controlpick.parent.patchValue({ [cardname]: ob })
        controlpick.parent.updateValueAndValidity();
      }

    }

    // this.control.get(this.data.name).patchValue()

    //console.log(this.arraycount)
    // controlpick.parent.patchValue({ [cardname]: file })
    // controlpick.parent.updateValueAndValidity();
    //console.log(this.control)
  }


  ngOnInit() {
    //console.log(this.data.name)

    console.log("this.errorsfile")

    console.log(this.errorsfile)
    //console.log(!this.data.hide)
    if (this.data.hide !== null || this.data.hide !== undefined) {
      if (this.data.hide) {
        this.control.get(this.data.name).disable()

      }



      try {


        if (this.control.get(this.data.name).controls !== undefined || this.control.get(this.data.name).controls !== null) {

          //console.log("CONTROLLLLLLLL:::>>>>>")
          //console.log(this.control)

          var a = this.control.get(this.data.name).controls[0]
          //console.log("this.control.get(this.data.name).controlszzzz")
          //console.log(a.controls)

          var temparray = [];
          Object.keys(a.controls).forEach((key) => {
            this.array.push(false)
            temparray.push(a.controls[key])
          });
          //console.log(temparray)
          this.arrayControls.push(temparray)
          this.onarray = this.arrayControls[this.arraycount]
          //console.log(this.onarray)
          //console.log("this.onarray")
          //console.log(this.onarray)
          //console.log(this.onarray)



        }


      } catch{

        //console.log("MAJOR ERROR IN LISTFORM 313")
      }


    }
  }
}
