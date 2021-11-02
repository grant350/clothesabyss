import { Component, OnInit, Input, ViewChildren, SimpleChanges, AfterContentInit, ViewChild, QueryList, ElementRef, Renderer2, OnChanges, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, ControlValueAccessor, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { customValidators } from './customvalidators';
import { FormSubmitting } from '../formsubmiting.service';
import { DataService } from '../products.service';
import * as rawjson from '../errorsmodule.json';
import { ListFormComponent } from '../dynamicforms/listform/listform.component'
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { UNITTEST } from './unittest';




@Component({
  selector: 'app-formfieldbuilder',
  templateUrl: './formfieldbuilder.component.html',
  styleUrls: ['./formfieldbuilder.component.scss']
})
export class FormfieldbuilderComponent implements AfterContentInit {
  @Input() formObj: any;
  //retrieves formobj
  //instead of submit function use provided data obj for submiit fun
  public auth: any;
  public mainformgroup = this.fb.group({});
  //this is a group made for the foundation
  public data: any;
  public file: any;
  public errorsfile: any;
  imageGroup: any = [];
  public errorjson: any = (rawjson as any).default;
  public ob = null;

  // public GroupBehaviorSUBJECT= BehaviorSubject<any>()


  @Input() dataobjvalues: any;
  @Input() index: any;
  @Input() enabled: any;
  @Input() selectedValue: any;
  @Input() variablepath: any;
  public AutoFill = true;
  //should return // {index:33,"localstorageName":MapData}
  public imageArrayPre = []
  constructor(private changeDetector: ChangeDetectorRef, private fb: FormBuilder, private fs: FormSubmitting, private json: DataService) {
    this.imageArrayPre = this.fs.GetArrayOfImages()
    if (this.selectedValue) {
      localStorage.removeItem(this.selectedValue)
    }
    this.enabled = true;

    //fillout form automaticaly




  }

  clicks(a) {
  }


  autoFill() {
    if (this.AutoFill) {
      this.dataobjvalues = {
        // IMAGE: this.imageArrayPre[0],
        PRODUCTCATAGORY: "somecat",
        COMPANYNAME: "clothesabyss",
        PARAGRAPHS: [
          { "PARAGRAPH": "this is a fake paragraph" },
          { "PARAGRAPH": "this is a fake paragraph2" }],
        TITLE: "this is a fake title",
        PRODUCTNAME: "fake name",
        CHOOSEOTHERPLATFORMS: 'false',
        MULTISETPRODUCTOPTIONS: "false",
        SHOWONSITE: "false",
        SPECIFICATIONS: [{ "KEY": "color", "VALUE": "red" }],
        SUBCATAGORY: "someproduct",
        TYPE: "mainslider",
        VARIENTS: [{


          VARIENTINFO: {
            MAINIMAGE: this.imageArrayPre[2],
            BINLOCATION: "L0003F001S0023B0000013",
            COST: 59.99,
            INVENTORY: 20,
            PRODUCTCONTENTS: "has fake contents in it.",
            PRODUCTPRICE: 74.99,
            PRODUCTSALEPRICE: 84.99,
            SKU: "10000vn129fnan23f",
            WEIGHT: 4323
          }
          ,


          LOCATION: [{
            LOCATIONFOUND: "1900 n 103rd ave",
            NAMEOFSTORE: "some store"
          }]
          ,


          IMAGEPAIR: [
            { ADDIMAGE: this.imageArrayPre[1] }
          ]
          ,

          OPTIONS: [
            { "KEY": "size", "VALUE": "55cm" }
          ]
        }
,
          {


            VARIENTINFO: {
              MAINIMAGE: this.imageArrayPre[1],
              BINLOCATION: "L0003F001S0023B0000003",
              COST: 29.99,
              INVENTORY: 10,
              PRODUCTCONTENTS: "has fake contents in it.",
              PRODUCTPRICE: 44.99,
              PRODUCTSALEPRICE: 44.99,
              SKU: "1000vn329fnan23f",
              WEIGHT: 2323
            }
            ,


            LOCATION: [{
              LOCATIONFOUND: "1700 n 103rd ave",
              NAMEOFSTORE: "walmart"
            }]
            ,


            IMAGEPAIR: [
              { ADDIMAGE: this.imageArrayPre[2] }
            ]
            ,

            OPTIONS: [
              { "KEY": "size", "VALUE": "25cm" }
            ]
          }

        ]
      }

    };

  }



  ngOnChanges(changes: SimpleChanges) {
    //  console.log(changes)
    if ('index' in changes) {
      //  console.log("is index")
      //console.log(this.index)
    }
    if ('dataobjvalues' in changes) {
      //  console.log("IS HERE YAYAYAYY")
      //console.log(this.dataobjvalues)
      try { this.dataobjvalues = JSON.parse(this.dataobjvalues) }
      catch{ console.log("datavalues is undefined or problem") }
      // console.log(this.dataobjvalues)
    }
    //you can get any girl you want

    if ('formObj' in changes) {
      // console.log("IS HERE YAYAYAYY")
      // console.log(this.formObj)
      try { this.formObj = JSON.parse(this.formObj) }
      catch{
        //  console.log("datavalues is undefined or problem")
      }
      //  console.log(this.formObj)
      //this.reloadTree()
    }
  }

  reloadTree() {
    this.enabled = false;
    // now notify angular to check for updates
    this.changeDetector.detectChanges();
    // change detection should remove the component now
    // then we can enable it again to create a new instance
    this.enabled = true;
  }

  submit(form) {
    if (form) {
      if (form.valid) {
        this.fs.ADDDATA(form.value, `${form.value[this.variablepath]}`, this.index)
      }
    }
  }


  checkValidation(name, validation, group) {
    if (validation) {
      if (validation.required || validation.customValidator) {
        if (validation.customValidator) {

          switch (validation.customValidator) {
            case "generalValidator":
              group.addControl(name, this.fb.control(null, [Validators.required], [customValidators.generalValidator.bind(this, validation)]))
              break;
            case "imageValidator":
              group.addControl(name, this.fb.control(null, [Validators.required], [customValidators.imageValidator.bind(this, validation)]))
              break;
            case "hideshow":
              group.addControl(name, this.fb.control(null, [Validators.required], [customValidators.hideshow.bind(this, validation, name, this.mainformgroup)]))
              break;
          }

        }
        else {
          if (name === "AUTH" || name === "auth") {
            group.addControl(name, this.fb.control(''))
          } else {
            group.addControl(name, this.fb.control('', Validators.required))
          }
        }
      }
      else {
        group.addControl(name, this.fb.control(""))
      }
    } else {
      group.addControl(name, this.fb.control(""))

    }
    return group
  }

  checkIMAGE(formgroup, objdata, name) {
    //console.log(formgroup, objdata, name)
    function dataURItoBlob(objdata) {
      var filetype = objdata.image_structure['filetype'];
      var path = objdata['path'];
      var xhr = new XMLHttpRequest()
      function imageExists(image_url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
      }

      var imageExistBool = imageExists(path)

      if (imageExistBool) {
        xhr.onload = (e) => {
          var blob = new Blob([xhr.response], { type: filetype })
          var url = URL.createObjectURL(blob)
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = function() {
            objdata['64bit'] = reader.result
            formgroup.patchValue({ [name]: objdata })
            //console.log('THE FORMGROUP')
            //console.log(formgroup)
            //console.log({...formgroup})

            formgroup.updateValueAndValidity();
          }
        }
      } else {
        formgroup.patchValue({ [name]: null })
        formgroup.updateValueAndValidity();
        //  console.log("IMAGE DOES NOT EXIST FB LINE 238")

      }
      xhr.open('GET', path)
      xhr.responseType = "arraybuffer"
      xhr.send()
    }
    dataURItoBlob(objdata)
  }

  checkDataInput(group, OBJDATA, formobj) {
    //console.log(group)


    if (formobj.valueAutoset) {
      group.patchValue({ [formobj.name]: formobj.valueAutoset })
      group.updateValueAndValidity()
    };

    if (this.dataobjvalues) {
      // console.log("DATAOBJ IS HERE LINE 186")
      try {
        var name = formobj.name

        if (OBJDATA !== undefined && OBJDATA !== null && OBJDATA !== {}) {
          if (formobj.type.toLowerCase() == "image") {
            if (OBJDATA.image_structure) {
              // console.log("has image structure");
              this.checkIMAGE(group, OBJDATA, name)
            }

          } else {
            group.patchValue({ [name]: OBJDATA })
            group.updateValueAndValidity()
          }
        }

        return true
      } catch{
        // console.log("ERROR VALUE BROKEN checkDataInput")
        return false
      }
    } else {
      // console.log("dataobj cannot be set Function checkDataInput Line 190")
      return false
    }
  }




  BUILDFORMCONTROL(obj, group, datavalue) {

    this.checkValidation(obj.name, obj.validation, group)
    try {
      var set = this.checkDataInput(group, datavalue, obj)
      if (set) {
        // console.log("PASSED")
      }
    }
    catch{
      // console.log("INVALID path this.dataobjvalues[obj.name]")
    }
  }
  // this.dataobjvalues[htmlobj.name][control.name]

  BUILDFORMGROUP(obj, datavalue) {
    var group = this.fb.group({})
    obj.controls.forEach((control, index) => {
      if (datavalue !== null && datavalue !== undefined) {
        this.BUILDFORMCONTROL(control, group, datavalue[control.name])
      } else {
        this.BUILDFORMCONTROL(control, group, null)
      }
    });
    return { "objname": obj.name, "group": group };
  }

  BUILDFORMARRAY(obj, datavalues) {
    var array = this.fb.array([])
    if (datavalues !== null) {
      datavalues.forEach((object, mindex) => {
        obj.groupFields.forEach((field, index) => {
          var result = this.BUILDFORMGROUP(field, datavalues[mindex])
          array.push(result.group)
        })
      })
    } else {
      obj.groupFields.forEach((field, index) => {
        var result = this.BUILDFORMGROUP(field, null)
        array.push(result.group)
      })
    }
    return { "objname": obj.name, "array": array };
  }



  parseObjs() {
    try { this.dataobjvalues = JSON.parse(this.dataobjvalues) }
    catch{
    }
    try { this.formObj = JSON.parse(this.formObj) }
    catch{
    }
    try {
      this.errorsfile = this.errorjson[this.selectedValue]
    } catch{
      //console.log("no error file LINE212")
    }
  }

  ngAfterContentInit() {

    this.autoFill()
    var that = this

    this.parseObjs()
    this.mainformgroup.reset({ onlySelf: true })

    this.formObj.forEach((htmlobj) => {
      if (htmlobj.subtypehtml == "singleControl" || htmlobj.subtypehtml == "options") {
        try {
          this.BUILDFORMCONTROL(htmlobj, this.mainformgroup, this.dataobjvalues[htmlobj.name])
        } catch{
          this.BUILDFORMCONTROL(htmlobj, this.mainformgroup, null)
        }
      }

      if (htmlobj.subtypehtml == "formGroup") {
        try {
          var resultC = this.BUILDFORMGROUP(htmlobj, this.dataobjvalues[htmlobj.name])
          this.mainformgroup.addControl(resultC['objname'], resultC['group'])

        } catch{
          var resultD = this.BUILDFORMGROUP(htmlobj, null)
          this.mainformgroup.addControl(resultD['objname'], resultD['group'])
        }
      }

      if (htmlobj.subtypehtml == "plainArray") {
        try {
          var resultE = this.BUILDFORMARRAY(htmlobj, this.dataobjvalues[htmlobj.name])
          this.mainformgroup.addControl(resultE['objname'], resultE['array'])
        } catch{
          var resultF = this.BUILDFORMARRAY(htmlobj, null)
          this.mainformgroup.addControl(resultF['objname'], resultF['array'])
        }
      }
      if (htmlobj.subtypehtml == "multiform") {
        var mainarray = that.fb.array([])

        if (that.dataobjvalues) {
          if (that.dataobjvalues[htmlobj.name] !== null && that.dataobjvalues[htmlobj.name] !== undefined) {

            that.dataobjvalues[htmlobj.name].forEach(varient => {
              console.log('varient',varient)
              run(varient)
            })
          }
        } else {
          run(null)
        }



        // run(null)

        function run(varient) {
          var groupContents = that.fb.group({})


          htmlobj.multiformControls.forEach(control => {


            if (control.subtypehtml == "formGroup") {
              try {
                var resultA = that.BUILDFORMGROUP(control, varient[control.name])
                groupContents.addControl(resultA['objname'], resultA['group'])
              } catch{
                var resultAB = that.BUILDFORMGROUP(control, null)
                groupContents.addControl(resultAB['objname'], resultAB['group'])
              }
            }
            if (control.subtypehtml == "plainArray") {
              try {
                var resultB = that.BUILDFORMARRAY(control, varient[control.name])
                groupContents.addControl(resultB['objname'], resultB['array'])
              } catch{
                var resultBC = that.BUILDFORMARRAY(control, null)
                groupContents.addControl(resultBC['objname'], resultBC['array'])
              }
            }
          })
          mainarray.push(groupContents)
        }

        that.mainformgroup.addControl(htmlobj.name, mainarray)
      }
      // console.log(that.mainformgroup)
    })
    this.mainformgroup.updateValueAndValidity();
    // console.log("mainformgroup line 497 formbuilder")
    console.log(this.mainformgroup)



  }



}
