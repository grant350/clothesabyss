import { Component, OnInit, Input, ViewChildren, SimpleChanges, ViewChild, QueryList, ElementRef, Renderer2, OnChanges, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, ControlValueAccessor, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { customValidators } from './customvalidators';
import { FormSubmitting } from '../formsubmiting.service';
import { DataService } from '../products.service';
import * as rawjson from '../errorsmodule.json';
import { ListFormComponent } from '../dynamicforms/listform/listform.component'
import { BehaviorSubject, Subscription, Subject } from 'rxjs';


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

  }


  clicks(a) {
  }




  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if ('index' in changes) {
      console.log("is index")
      console.log(this.index)

    }
    if ('dataobjvalues' in changes) {
      console.log("IS HERE YAYAYAYY")
      console.log(this.dataobjvalues)
      try { this.dataobjvalues = JSON.parse(this.dataobjvalues) }
      catch{ console.log("datavalues is undefined or problem") }
      console.log(this.dataobjvalues)

    }
    if ('formbuilderdataobj' in changes) {
      console.log("IS HERE formbuilderdataobj yayayaya")
      console.log(this.formbuilderdataobj)
      try { this.formbuilderdataobj = JSON.parse(this.formbuilderdataobj) }
      catch{ console.log("formbuilderdataobj is undefined or problem") }
      console.log(this.formbuilderdataobj)

    }

    if ('formObj' in changes) {
      console.log("IS HERE YAYAYAYY")
      console.log(this.formObj)
      try { this.formObj = JSON.parse(this.formObj) }
      catch{ console.log("datavalues is undefined or problem") }
      console.log(this.formObj)
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
                  console.log("already has forvalue in path")
                }else{
                  this.formbuilderdataobj['MANIPULATIONINFO'].path['startpath'] = `${path}${form.value[this.variablepath]}`;
                }
              

                console.log("LINE 106 form value")
                console.log(form.value[this.variablepath])
                //change to variable
                console.log("FUTURE ERROR LINE 104")
              }
            }
            if (this.formbuilderdataobj["MainJsonData"]["DATA"]) {
              this.formbuilderdataobj["MainJsonData"]["DATA"] = form.value
              console.log("MAINEDIT num line102")
              console.log(this.formbuilderdataobj)
            } else {
              this.formbuilderdataobj["MainJsonData"] = form.value

            }
          }
        try {
          this.fs[`ADDDATA`](this.formbuilderdataobj)
          // form.reset()
        }
        catch{
          console.log("ERROR line 109")
        }
      } else {
        console.log("form is not valid??")
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

  }





  ngOnInit() {

    try { this.dataobjvalues = JSON.parse(this.dataobjvalues) }
    catch{ console.log("datavalues is undefined or problem") }
    console.log(this.dataobjvalues)

    try { this.formbuilderdataobj = JSON.parse(this.formbuilderdataobj) }
    catch{ console.log("formbuilderdataobj is undefined or problem") }
    console.log(this.dataobjvalues)

    console.log("IS HERE YAYAYAYY")
    console.log(this.formObj)
    try { this.formObj = JSON.parse(this.formObj) }
    catch{ console.log("datavalues is undefined or problem") }
    console.log(this.formObj)

    this.fs.SignUpCodeView().subscribe((x) => {
      //(x);
      this.auth = x
    })

    try {
      this.errorsfile = this.errorjson[this.selectedValue]

    } catch{
      console.log("no error file")
    }
    this.mainformgroup.reset({ onlySelf: true })


    this.formObj.forEach((htmlobj) => {
      if (htmlobj.type === "singleControl") {
        this.checkValidation(htmlobj.name, htmlobj.validation, this.mainformgroup)
        try {
          //("VALUES")
          //(this.dataobjvalues[htmlobj.name])
          //("dataobj[htmlobj.name]");
          //(this.dataobjvalues[htmlobj.name])
          this.mainformgroup.patchValue({ [htmlobj.name]: this.dataobjvalues[htmlobj.name] })
          //(this.mainformgroup)
        } catch{
          console.log("no values to be set")
        }
        //("singlecontrol Done")
      }

      if (htmlobj.type === "auth") {
        this.checkValidation(htmlobj.name, htmlobj.validation, this.mainformgroup)
        try {
          this.mainformgroup.patchValue({ [htmlobj.name]: this.dataobjvalues[htmlobj.name] })
          //(this.mainformgroup)
        } catch{
          console.log("no values to be set")
        }
        //("auth Done")
      }
      //formgroup
      if (htmlobj.type === "formGroup") {
        var group = this.fb.group({})
        htmlobj.groupFields.forEach((field, index) => {
          this.checkValidation(field.name, field.validation, group)
          try {
            //("VALUES")
            //(this.dataobjvalues[htmlobj.name])
            //("dataobj[htmlobj.name]");
            //(this.dataobjvalues[htmlobj.name][field.name])
            this.mainformgroup.get(htmlobj.name).patchValue({ [field.name]: this.dataobjvalues[htmlobj.name][field.name] })
            //(this.mainformgroup)
          } catch{
            console.log("no values to be set")
          }
        });

        this.mainformgroup.addControl(htmlobj.name, group)
      }

      if (htmlobj.type === "plainArray") {
        var formarray = this.fb.array([])
        try {
          //("this.dataobjvalues 189")
          //(this.dataobjvalues)
          //((htmlobj.name).toUpperCase())
          this.dataobjvalues[(htmlobj.name).toUpperCase()].forEach((item, index) => {
            //(item)

            var formgroup = this.fb.group({})
            htmlobj.groupFields.forEach((field) => {
              this.checkValidation(field.name, field.validation, formgroup)
              try {
                //("VALUES 194")
                //(item)
                formgroup.patchValue({ [field.name]: item[field.name] })
                //("formgroup")
                //(formgroup)

              } catch{
                //("no values to be set 201")
              }
            })
            formarray.push(formgroup)
          })
        } catch{
          var formgroup = this.fb.group({})
          htmlobj.groupFields.forEach((field, index) => {
            this.checkValidation(field.name, field.validation, formgroup)
          })
          formarray.push(formgroup)

        }



        this.mainformgroup.addControl(htmlobj.name, formarray)
      }


      if (htmlobj.type === "formArray") {
        var mainarray = this.fb.array([])
        var mainarray = this.fb.array([])
        var groupContents = this.fb.group({})
        htmlobj.controls.forEach((control) => {
          //(control)

          /** this is Listform -> group **/
          if (control.type === "formGroup") {
            /** this is Listform -> group **/


            var group = this.fb.group({})

            if (this.dataobjvalues) {
              try {
                var x = this.dataobjvalues[htmlobj.name].filter(o => o.hasOwnProperty(control.name))
                var element = x[0][control.name]
                //("ELEMENT :234")

                //(element)

                control.groupFields.forEach((field) => {
                  this.checkValidation(field.name, field.validation, group)
                  if (field.validation.options.datatype['Type'] === 'image') {
                    //("trying")
                    function dataURItoBlob(obj) {
                      //("object :244")
                      //(obj)
                      var filetype = obj.image_structure['filetype'];
                      var path = obj['path'];
                      var xhr = new XMLHttpRequest()
                      //("XHR")
                      //(xhr)

                      function imageExists(image_url) {
                        //("image_url line 252")
                        //(image_url)
                        var http = new XMLHttpRequest();
                        http.open('HEAD', image_url, false);
                        http.send();
                        //("http.satus")
                        //(http.status)
                        return http.status != 404;
                      }
                      var x = imageExists(path)
                      //(x)

                      if (x) {
                        xhr.onload = (e) => {
                          var blob = new Blob([xhr.response], { type: "image/png" })
                          var url = URL.createObjectURL(blob)
                          //("SUCH A BITCH BLOB")
                          //(blob)
                          //(url)

                          const reader = new FileReader()
                          reader.readAsDataURL(blob)
                          reader.onload = function() {
                            //("reader.result :283")
                            //(reader.result)
                            element[field.name]['64bit'] = reader.result
                            group.patchValue({ [field.name]: element[field.name] })
                            group.updateValueAndValidity();
                            //("GROUP : 279")
                            //(group)
                          }
                        }
                      } else {
                        group.patchValue({ [field.name]: null })
                        group.updateValueAndValidity();
                        //("GROUP : 284")
                        return false

                      }
                      xhr.open('GET', path)
                      xhr.responseType = "arraybuffer"
                      xhr.send()
                    }
                    // dataURItoBlob(element)

                    try {
                      dataURItoBlob(element[field.name])
                    } catch{
                      //("image error in group")
                    }

                    //("ELEMENT 306")
                    //(element)
                    //("grOUP line 306")
                    //(group)

                  } else {
                    group.patchValue({ [field.name]: element[field.name] })
                    //("GROUP : 306")
                    //(group)
                  }
                })

              } catch{
                //("cant add values")
              }
              groupContents.addControl(control.name, group)
              groupContents.updateValueAndValidity();

              //catch group
            } else {
              control.groupFields.forEach((field) => {
                this.checkValidation(field.name, field.validation, group)
                groupContents.addControl(control.name, group)
              })
            }

          }
          //end of group
          //end of group
          //end of group

          //("groupContents")
          //(groupContents)




          /** this is Listform -> array **/
          if (control.type === "plainArray") {
            /** this is Listform -> array **/

            var subarray = this.fb.array([])
            if (this.dataobjvalues) {
              //var fgroup = this.fb.group({})

              try {
                var x = this.dataobjvalues[htmlobj.name].filter(o => o.hasOwnProperty(control.name))
                //(x)
                var element = x[0][control.name]
                console.log("Element: 341")
                console.log(element)
                //(control.name)
                //(element)

                element.forEach((item, index) => {
                  var fgroup = this.fb.group({})

                  console.log("item")
                  console.log(item)
                  console.log("index")
                  console.log(index)

                  //{addimage:{}}
                  control.groupFields.forEach((field, zindex) => {
                    console.log("field:354")
                    console.log(field)

                    this.checkValidation(field.name, field.validation, fgroup)
                    if (field.validation.options.datatype['Type'] === 'image') {
                      console.log("Fieldname")
                      console.log(field.name)
                      console.log("zindex")
                      console.log(zindex)
                      console.log("item")
                      console.log(item[field.name])
                      //("trying")

                      function dataURItoBlob(obj) {
                        console.log("obj line 362")
                        console.log(obj)
                        var filetype = obj.image_structure['filetype'];
                        var path = obj['path'];
                        console.log("path:365")
                        console.log(path)
                        var xhr = new XMLHttpRequest()
                        //("XHR")
                        //(xhr)
                        function imageExists(image_url) {
                          var http = new XMLHttpRequest();
                          http.open('HEAD', image_url, false);
                          http.send();
                          //("http.satus")
                          //(http.status)
                          return http.status != 404;
                        }
                        var x = imageExists(path)
                        var b;


                        if (x) {
                          xhr.onload = (e) => {
                            var blob = new Blob([xhr.response], { type: "image/png" })
                            var url = URL.createObjectURL(blob)
                            const reader = new FileReader()
                            reader.readAsDataURL(blob)
                            reader.onload = function() {
                              //("READER RESULT :427")
                              //(reader.result)
                              item[field.name]['64bit'] = reader.result
                              fgroup.patchValue({ [field.name]: item[field.name] })
                            }

                          }
                        } else {
                          fgroup.patchValue({ [field.name]: null })
                          console.log("image does not exist!!")
                          return false
                        }
                        try {
                          xhr.open('GET', path)
                          xhr.responseType = "arraybuffer"
                          xhr.send()
                        } catch{
                          console.log("error")
                          fgroup.patchValue({ [field.name]: null })
                        }


                      }

                      dataURItoBlob(item[field.name])
                      console.log("fgroup:418")
                      console.log(fgroup)
                    } else {
                      fgroup.patchValue({ [field.name]: item[field.name] })
                    }

                  })

                  subarray.push(fgroup)
                  console.log("SUBARRAY")
                  console.log(subarray)

                })
              }
              catch{
                //("cannot make use data provided :457")
              }

            } else {
              var fgroup = this.fb.group({})
              control.groupFields.forEach((field, index) => {
                this.checkValidation(field.name, field.validation, fgroup)
              })
              subarray.push(fgroup)

            }
            groupContents.addControl(control.name, subarray)
            groupContents.updateValueAndValidity();

          }

          //main control list >below
        })
        mainarray.push(groupContents)
        //(mainarray)
        this.mainformgroup.addControl(htmlobj.name, mainarray)
        this.mainformgroup.updateValueAndValidity();




      }
    })
    //("135")
    console.log("mainformgroup")
    this.mainformgroup.updateValueAndValidity();

    console.log(this.mainformgroup)
  }




}
