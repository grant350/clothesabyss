import { Component, OnInit, Input, ViewChildren, SimpleChanges, ViewChild, QueryList, ElementRef, Renderer2, OnChanges, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, ControlValueAccessor, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { customValidators } from './customvalidators';
import { FormSubmitting } from '../formsubmiting.service';
import { DataService } from '../products.service';
import * as rawjson from '../errorsmodule.json';
import { ListFormComponent } from '../dynamicforms/listform/listform.component'
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import {UNITTEST} from './unittest';



@Component({
  selector: 'app-formfieldbuilder',
  templateUrl: './formfieldbuilder.component.html',
  styleUrls: ['./formfieldbuilder.component.scss']
})
export class FormfieldbuilderComponent implements OnInit, OnChanges {
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


  @Input() formbuilderdataobj: any;
  @Input() dataobjvalues: any;
  @Input() index: any;
  @Input() enabled: any;
  @Input() selectedValue: any;
  @Input() variablepath: any;

  //should return // {index:33,"localstorageName":MapData}

  constructor(private changeDetector: ChangeDetectorRef, private fb: FormBuilder, private fs: FormSubmitting, private json: DataService) {
    if (this.selectedValue) {
      localStorage.removeItem(this.selectedValue)
    }
    this.enabled = true;
  }

  clicks(a) {
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
     console.log(this.dataobjvalues)
    }
    //you can get any girl you want
    if ('formbuilderdataobj' in changes) {
      // console.log("IS HERE formbuilderdataobj yayayaya")
      // console.log(this.formbuilderdataobj)
      try { this.formbuilderdataobj = JSON.parse(this.formbuilderdataobj) }
      catch{
      //   console.log("formbuilderdataobj is undefined or problem")
       }
    //  console.log(this.formbuilderdataobj)
    }
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
      //(form.value)
      //get index from param
        if (form.valid) {
          if (this.formbuilderdataobj) {
            if (this.formbuilderdataobj['MANIPULATIONINFO']) {
              if (this.formbuilderdataobj['MANIPULATIONINFO'].path && this.variablepath) {
                var path = this.formbuilderdataobj['MANIPULATIONINFO'].path['startpath']
                if (this.formbuilderdataobj['MANIPULATIONINFO'].path['startpath'].includes(`${form.value[this.variablepath]}`)){
                  console.log("already has form value in path")
                }else{
                  this.formbuilderdataobj['MANIPULATIONINFO'].path['startpath'] = `${path}${form.value[this.variablepath]}`;
                }
                // console.log("LINE 106 form value")
                // console.log(form.value[this.variablepath])
                // //change to variable
                // console.log("FUTURE ERROR LINE 104")
              }
            }
            if (this.formbuilderdataobj["MainJsonData"]["DATA"]) {
              this.formbuilderdataobj["MainJsonData"]["DATA"] = form.value
              // console.log("MAINEDIT num line102")
              // console.log(this.formbuilderdataobj)
            } else {
              this.formbuilderdataobj["MainJsonData"] = { }
              this.formbuilderdataobj["MainJsonData"] = form.value
            }
          }
        try {
          this.fs[`ADDDATA`](this.formbuilderdataobj)
          // form.reset()
        }
        catch{
      //    console.log("ERROR line 109")
        }
      } else {
      //  console.log("form is not valid??")
        if (this.selectedValue) {
          localStorage.removeItem(this.selectedValue)
        }
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



checkDataInput(group,OBJDATA,formobj){

  console.log("OBJDATA")
console.log(OBJDATA)

if (formobj.valueAutoset ){
  group.patchValue({ [formobj.name]: formobj.valueAutoset })
  group.updateValueAndValidity()
};

  if (this.dataobjvalues ){
  //  console.log("DATAOBJ IS HERE LINE 186")
    try {
      var name = formobj.name

          if (OBJDATA !== undefined || OBJDATA !== null){
            if (formobj.type.toLowerCase() == "image"){
                if (OBJDATA.image_structure){
                    console.log("has image structure");
                    this.checkIMAGE(group,OBJDATA,name)
                }

            }else{
                   group.patchValue({ [name]: OBJDATA })
                   group.updateValueAndValidity()
                 }
          }

      return true
    } catch{
      console.log("ERROR VALUE BROKEN checkDataInput")
      return false
    }
  }else{
    console.log("dataobj cannot be set Function checkDataInput Line 190")
    return false
  }
}


checkIMAGE(formgroup,objdata,name){

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
              formgroup.patchValue({ [name]: objdata})
              formgroup.updateValueAndValidity();
            }
          }
        }else{
          formgroup.patchValue({ [name]: null})
          formgroup.updateValueAndValidity();
        //  console.log("IMAGE DOES NOT EXIST FB LINE 238")

        }
        xhr.open('GET', path)
        xhr.responseType = "arraybuffer"
        xhr.send()
      }
       dataURItoBlob(objdata)
}

  BUILDFORMCONTROL(obj,group,datavalue){

      this.checkValidation(obj.name, obj.validation, group)
    try{
      var set = this.checkDataInput(group,datavalue,obj)
      if (set){
        console.log("PASSED")
      }
      }
    catch{
        console.log("INVALID path this.dataobjvalues[obj.name]")
    }
  }
// this.dataobjvalues[htmlobj.name][control.name]

  BUILDFORMGROUP(obj,datavalue){
    //BUILDFORMCONTROL()
    var group = this.fb.group({})
      obj.controls.forEach((control, index) => {
        if (datavalue !== null && datavalue !== undefined){
          this.BUILDFORMCONTROL(control,group,datavalue[control.name])
        }else{
          this.BUILDFORMCONTROL(control,group,null)
        }
      });
      return {"objname":obj.name,"group":group};
  }

  BUILDFORMARRAY(obj,datavalues){
    console.log(obj.groupFields)
    var array = this.fb.array([])
    if (datavalues !== null){
      datavalues.forEach(object=>{
        console.log(object)
        obj.groupFields.forEach((field, index) => {
          var result = this.BUILDFORMGROUP(field,datavalues[field.name])
          array.push(result.group)
        })
      })
    }else{
      obj.groupFields.forEach((field, index) => {
        var result =this.BUILDFORMGROUP(field,null)
        array.push(result.group)
      })
    }
    return {"objname":obj.name,"array":array};


  }



  parseObjs(){
    try { this.dataobjvalues = JSON.parse(this.dataobjvalues) }
    catch{
    //   console.log("datavalues is undefined or problem NgOnInit line 200 formbuilder")
     }
    try { this.formbuilderdataobj = JSON.parse(this.formbuilderdataobj) }
    catch{
      //console.log("formbuilderdataobj is undefined or problem NgOnInit line 200 formbuilder")
     }
    try { this.formObj = JSON.parse(this.formObj) }
    catch{
    //   console.log("datavalues is undefined or problem NgOnInit line 200 formbuilder")
     }
    try {
      this.errorsfile = this.errorjson[this.selectedValue]
    } catch{
      //console.log("no error file LINE212")
    }
  }

  ngOnInit() {
    var that=this

    this.parseObjs()
    this.mainformgroup.reset({ onlySelf: true })

    this.formObj.forEach((htmlobj) => {
      if (htmlobj.subtypehtml == "singleControl" || htmlobj.subtypehtml == "options"){
        try {
          this.BUILDFORMCONTROL(htmlobj,this.mainformgroup,this.dataobjvalues[htmlobj.name])
        } catch{
          this.BUILDFORMCONTROL(htmlobj,this.mainformgroup,null)
        }
      }

      if (htmlobj.subtypehtml == "formGroup" ){
        try{
          var resultC = this.BUILDFORMGROUP(htmlobj,this.dataobjvalues[htmlobj.name])
          this.mainformgroup.addControl(resultC['objname'], resultC['group'])

        }catch{
          var resultD = this.BUILDFORMGROUP(htmlobj,null)
          this.mainformgroup.addControl(resultD['objname'], resultD['group'])
        }
      }

      if (htmlobj.subtypehtml == "plainArray" ){
        try{
          var resultE = this.BUILDFORMARRAY(htmlobj,this.dataobjvalues[htmlobj.name])
          this.mainformgroup.addControl(resultE['objname'], resultE['array'])
        }catch{
        var resultF = this.BUILDFORMARRAY(htmlobj,null)
          this.mainformgroup.addControl(resultF['objname'], resultF['array'])
        }
      }
      if (htmlobj.subtypehtml == "multiform" ){
        var mainarray = that.fb.array([])
         var groupContents = that.fb.group({})
         console.log("this.dataobjvalues")
         console.log(that.dataobjvalues)
         console.log(htmlobj.name)

                    if (that.dataobjvalues[htmlobj.name]  !== null && that.dataobjvalues[htmlobj.name]  !== undefined){

                      that.dataobjvalues[htmlobj.name].forEach(varient=>{
                        run(varient)
                      })
                    }else{
                      run(null)
                    }

// run(null)

    function run(varient){
                    console.log("VARIENT")
                    console.log(varient)

        htmlobj.multiformControls.forEach(control=>{
          console.log("CONTROLNAME line 366")
          console.log(control.name)


          if (control.subtypehtml == "formGroup" ){
            try{
              var resultA = that.BUILDFORMGROUP(control,varient[control.name])
              groupContents.addControl(resultA['objname'], resultA['group'])
            }catch{
              var resultAB = that.BUILDFORMGROUP(control,null)
              groupContents.addControl(resultAB['objname'], resultAB['group'])
            }
          }
          if (control.subtypehtml == "plainArray" ){
            try{
              var resultB = that.BUILDFORMARRAY(control,varient[control.name])
              groupContents.addControl(resultB['objname'], resultB['array'])
            }catch{
            var resultBC = that.BUILDFORMARRAY(control,null)
              groupContents.addControl(resultBC['objname'], resultBC['array'])
            }
          }
        })
        mainarray.push(groupContents)
}


        that.mainformgroup.addControl(htmlobj.name, mainarray)
      }
      console.log(that.mainformgroup)
    })
    this.mainformgroup.updateValueAndValidity();
  }
}
