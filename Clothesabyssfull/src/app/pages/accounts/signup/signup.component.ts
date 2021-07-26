import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerService } from '../../../server.service';
import {Location} from '@angular/common';
import { FormSubmitting } from '../../../formsubmiting.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public formitems: any = [];
  signupgroup: FormGroup;
  formvalue: any;
  public formObj: any;
  public selectedValue="signup"
  //in another ts file or compnent, switch statement sort components




  constructor(private http: HttpClient, public fs: FormSubmitting,  private location:Location) {
  }
  ngOnInit() {
    this.formObj=[
     {
      "html":"singlefield",
      "type":"singleControl",
      "subtypehtml":"singlefield",
      "name":"USERNAME",
      "style":{
        "width":"60%",
        "height":"30px",
        "font-size":"16px"
      },
      "ClientName":"Username",
      "validation":{
       "required":true,
        "customValidator": "generalValidator",

        "options":{
          "datatype":{ "Type":"any"},

          "length":{
            "minCharlength":6,
          "maxCharlength":16
          //"equal":33
        },
          "patterns":[
            {"pattern":"[a-zA-Z]","minMatch":4,"maxMatch":10},
        {"pattern":"[0-9]","minmatch":4,"maxmatch":10}
      ]

        }
      }
    },
    {
     "html":"singlefield",
     "type":"singleControl",
     "subtypehtml":"singlefield",
     "name":"PASSWORD",
     "style":{
       "width":"60%",
       "height":"30px",
       "font-size":"16px"
     },
     "ClientName":"Password",
     "validation":{
      "required":true,
       "customValidator": "generalValidator",

       "options":{
           "compare":{
             "controlname":"PASSWORDMATCH",
             "status":"PENDING"
           },
         "datatype":{ "Type":"any"},

         "length":{
           "minCharlength":6,
         "maxCharlength":16
         //"equal":33
      }

         ,"patterns":[
           {"pattern":"[a-z]","minMatch":5,"maxMatch":15},
           {"pattern":"[A-Z]","minMatch":1,"maxMatch":10},
       {"pattern":"[0-9]","minmatch":2,"maxmatch":10},
       {"pattern":"[!@#$%^&*()]","minmatch":1,"maxmatch":8}

     ]

       }
     }
   },
   {
    "html":"singlefield",
    "type":"singleControl",
    "subtypehtml":"singlefield",
    "name":"PASSWORDMATCH",
    "style":{
      "width":"60%",
      "height":"30px",
      "font-size":"16px"
    },
    "ClientName":"Password Match",
    "validation":{
     "required":true,
      "customValidator": "generalValidator",

      "options":{
        "compare":{
          "controlname":"PASSWORD"
        },
        "datatype":{ "Type":"any"},

        "length":{
          "minCharlength":6,
        "maxCharlength":16
        //"equal":33
     }

    //     ,"patterns":[
    //       {"pattern":"[a-zA-Z]","minMatch":4,"maxMatch":10},
    //   {"pattern":"[0-9]","minmatch":4,"maxmatch":10}
    // ]

      }
    }
  },
  {
   "html":"singlefield",
   "type":"singleControl",
   "subtypehtml":"singlefield",
   "name":"FIRSTNAME",
   "style":{
     "width":"60%",
     "height":"30px",
     "font-size":"16px"
   },
   "ClientName":"Firstname",
   "validation":{
    "required":true,
     "customValidator": "generalValidator",

     "options":{
       "datatype":{ "Type":"string"},
       "length":{
         "minCharlength":3,
       "maxCharlength":20
       //"equal":33
     }

     }
   }
 },

 {
  "html":"singlefield",
  "type":"singleControl",
  "subtypehtml":"singlefield",
  "name":"LASTNAME",
  "style":{
    "width":"60%",
    "height":"30px",
    "font-size":"16px"
  },
  "ClientName":"Lastname",
  "validation":{
   "required":true,
    "customValidator": "generalValidator",

    "options":{
      "datatype":{ "Type":"string"},
      "length":{
        "minCharlength":3,
      "maxCharlength":20
      //"equal":33
    }

    }
  }
},

{
 "html":"singlefield",
 "type":"singleControl",
 "subtypehtml":"singlefield",
 "name":"EMAIL",
 "style":{
   "width":"60%",
   "height":"30px",
   "font-size":"16px"
 },
 "ClientName":"Email",
 "validation":{
  "required":true,
   "customValidator": "generalValidator",

   "options":{
     "length":{
       "minCharlength":6,
     "maxCharlength":100
     //"equal":33
   },
   "patterns":[
{'pattern':'^[a-zA-Z0-9_.-]{3,25}@[a-zA-Z]{3,15}.[a-zA-Z]{2,10}$','minMatch':1}
   ]

   }
 }
},
{
  "html": "multiform",
  "type": "formArray",
  "multiadder":false,
  "name": "ADDRESSINFO",
  "ClientName":"Add Address",
  "validation": {
    "required": false
  },

  "controls": [
    {
      "name": "Address information",
      "type": "formGroup",
      "groupFields": [
        {
          //options select dropdown
          "name": "address",
          "type": "field",
          "ClientName":"Address",
          "subtypehtml":"singlefield",
          "hidename":true

        }
        ]
        }
      ]

    },
    {
      "html": "multiform",
      "type": "formArray",
      "multiadder":false,
      "name": "BILLINGINFO",
      "ClientName":"Add Billing Info",
      "validation": {
        "required": false
      },

      "controls": [
        {
          "name": "Billing",
          "type": "formGroup",
          "groupFields": [
            {
              //options select dropdown
              "name": "CARDNUMBER",
              "type": "field",
              "ClientName":"Cardnumber",
              "subtypehtml":"singlefield",
              "hidename":true

            },
            {
              //options select dropdown
              "name": "CARDEXPDATE",
              "type": "field",
              "ClientName":"Card Expire Date",
              "subtypehtml":"singlefield",
              "hidename":true

            },
            {
              //options select dropdown
              "name": "CARDSECURITYNUMBER",
              "type": "field",
              "ClientName":"Card Security Number",
              "subtypehtml":"singlefield",
              "hidename":true

            }
            ]
            }
          ]

        },
        {
          "html": "auth",
          "type": "auth",
          "name": "CODE",
          "ClientName":"confirm code",
          "validation": {
            "required": false
          }
            }
  ]
  }




back(){
this.location.back();
}




}
