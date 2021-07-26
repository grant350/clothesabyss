import { Component, OnInit,Output, AfterViewInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FormControl, FormBuilder,FormArray, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,AfterViewInit {

public page = "allCatagories"
public homeimg="homeImage"
public width="100%"
public height="100vh"
public box=true
public banner=true


public type={"type":"mainslider","func":"specific"}

object1:FormGroup;
mainForm:FormGroup;


//Forms



 public object1_data:any =[
{"name":"firstname",
"type":"field",
"Validators":true},

{"name":"lastname",
"type":"field",
"Validators":false},

{"name":"address",
"type":"formGroup",
"Validators":false,
"groupFields":[
  {"name":"add1",
  "type":"field",
  "Validators":true},
  {"name":"add2",
  "type":"field",
  "Validators":true},
  {"name":"state",
  "type":"field",
  "Validators":true},
  {"name":"zip",
  "type":"field",
  "Validators":true}
]
},

{"name":"phone",
"type":"formArray",
"controls":[
  {"name":"phone",
  "type":"field",
  "Validators":true
}
]
},

{"name":"tools",
"type":"formArray",
"controls":[
  {"name":"tools",
  "type":"formGroup",
  "Validators":true,
  "groupFields":[

    {"name":"toolname",
    "type":"field",
    "Validators":true},

    {"name":"toolweight",
    "type":"field",
    "Validators":true}

  ]
}
]
}

];



makegroup(objpush){

console.log(objpush)

  var formg = this.fb.group({});
  objpush.groupFields.forEach((field)=>{
    formg.addControl(field.name,this.fb.control(''))
  })
  return formg

}

sub(info,index,objname){

console.log(this.object1.get(objname)['controls'])
console.log(this.object1.get(objname)['controls'][0])

  console.log(index)
  console.log(info)
  console.log(objname)





if (this.object1_data[index].type === 'formArray'){
  var o = <FormArray>this.object1.get(objname)
this.object1_data[index].controls.forEach((control)=>{
  console.log(control)
  if (control.type === "formGroup"){
    var objectpush = this.object1_data[index].controls[0]
    this.object1_data[index].controls.push(objectpush)
    o.push(this.makegroup(objectpush));
    console.log(this.object1_data)
    console.log(this.object1)
  }
  if (control.type === "field"){
    var objectpush = this.object1_data[index].controls[0]
    this.object1_data[index].controls.push(objectpush)
    o.push(this.fb.control(''));
    console.log(this.object1_data)
    console.log(this.object1)

  }
})

}
}


  constructor(private fb:FormBuilder){

    this.object1 = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      address:this.fb.group({
        add1:[''],
        add2:[''],
        state:[''],
        zip:['']
      }),
      phone:this.fb.array([
        this.fb.control('')

      ]),
      tools:this.fb.array([
        this.fb.group({
          toolname:this.fb.control(''),
          toolweight:this.fb.control('')
        })
      ])

    })
  }

  ngOnInit() {}

  ngAfterViewInit(){
  }

}
