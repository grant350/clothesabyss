import { Component, OnInit, Input, HostListener, AfterViewChecked, ViewChild, AfterViewInit, ElementRef, Renderer2, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Subscription } from 'rxjs';
import { customValidators } from '../../formfieldbuilder/customvalidators';


@Component({
  selector: 'app-singlecontrol',
  templateUrl: './singlecontrol.component.html',
  styleUrls: ['./singlecontrol.component.scss']
})
export class SinglecontrolComponent implements OnInit {
  @Input() data: any;
  @Input() control: any;
  @Input() errorsfile: any;
  @Input() auth: any;
  //@Input() value:any
  @Input() singlecontrolenable: any;

  @Input() parent: any;
  public JSON = JSON
  public image: any;
  public status: any;
  public dateval: any;
  //try ng on changes wait for image to pass


  constructor(private renderer: Renderer2) {
    //this.singlecontrolenable = true
  }
//
// ngOnChanges(){
// // console.log("change happend")
// // console.log(this.image)
// // this.control.get(this.data.name).statusChanges.subscribe(s => {
// //
// // console.log(this.control.get(this.data.name).value)
// // if ( this.control.get(this.data.name)['64bit'] || this.control.get(this.data.name)['path'] ) {
// //   console.log("has one path or 64bit")
// //   try {
// //     this.image = this.control.get(this.data.name)['path']
// //   }catch{
// //     this.image = this.control.get(this.data.name)['64bit']
// //     console.log("line 156 cannot get canvas image ")
// //   }
// // }
// //
// // })
//
// }



  autodate() {
    console.log("autodate")
    var controlpick = this.control.get(this.data.name)
    var cardname = this.data.name;
    var date = new Date();
    //console.log(((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    var dateval: string = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

    console.log(dateval)
    this.dateval = dateval
    try {
      this.control.patchValue({ [cardname]: dateval.toString() })
      console.log(this.control)
      this.parent.updateValueAndValidity()
      controlpick.updateValueAndValidity()
    } catch{
      controlpick.patchValue({ [cardname]: dateval.toString() })
      console.log("no parent")
      console.log(controlpick.value)
      controlpick.updateValueAndValidity()
      controlpick.parent.updateValueAndValidity()
    }
//works
  }



  ngOnInit() {
  if (this.data.type.toLowerCase() == "image"){
    if (this.control.get(this.data.name).value){
      console.log(this.control.get(this.data.name).value)
      console.log(this.control.get(this.data.name).value)
      console.log(this.control.get(this.data.name).value)
      console.log(this.control.get(this.data.name).value)
      console.log(this.control.get(this.data.name).value)

      try{
        this.image = this.control.get(this.data.name).value['64bit']
      }catch{
        this.image = this.control.get(this.data.name).value['path']

        console.log("could NOT set IMAGE line 100")
      }
    }
  }




    if (this.data.name === "DATE" || this.data.name === "date") {
      this.dateval = this.control.get(this.data.name).value
    }

    this.status = this.control.get(this.data.name).status
    this.control.get(this.data.name).statusChanges.subscribe(s => {
      try {
        this.status = s
        // if ( this.control.get(this.data.name)['64bit']) {
        //   try {
        //     this.image = this.control.get(this.data.name)['path']
        //   }catch{
        //     this.image = this.control.get(this.data.name)['64bit']
        //   }
        //   //check imagepath()
        //  }
       } catch{
  console.log("NO Status");
}
     })

  }






onImagePicksinglecontrol(e, cardname, controlpick) {

  //console.log("Parent")
  //console.log(this.parent)
  if (e.target.files && e.target.files[0]) {
    const file = (e.target).files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file)
    var that_ = this
    reader.onload = (e) => {
      var img: any = new Image;
      var url = e.target.result;
      img.src = e.target.result;
      var keyexist = false
      that_.image = reader.result
      img.onload = function() {
        var ob = { "64bit": reader.result,  "image_structure": { "width": img.width, "height": img.height, "filename": file.name, "filesize": file.size, "filetype": file.type } }
        try {
          controlpick.parent.patchValue({ [cardname]: ob })
          controlpick.parent.updateValueAndValidity();
          that_.parent.parent.updateValueAndValidity()
          that_.parent.updateValueAndValidity()
          controlpick.updateValueAndValidity()
        } catch{
          controlpick.updateValueAndValidity()
        }

        if (this.parent){
          this.parent.updateValueAndValidity()
          console.log("updated value in single control")
          console.log(this.parent)
        }
      }

    }


  }
  // this.imagect=false
  // setTimeout(function(){ this.imagect=true }, 3000);



  //reload .image-ct



  //console.log(this.control)
  //console.log(this.image)

}

}
