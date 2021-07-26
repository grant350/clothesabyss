import { Component, Input, OnInit, ViewChild, SimpleChanges, OnChanges, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GETDATA } from '../../../../getData.service';
import { GlobalFormService } from '../../../../globalformservice.service';

@Component({
  selector: 'app-salesdata',
  templateUrl: './salesdata.component.html',
  styleUrls: ['./salesdata.component.scss']
})
export class SalesdataComponent implements OnInit {
  public formObj: any;
  public enabled = true;
  public index: any;
  public dataobjvalues: any;
  public selectedValue: any;
  public formbuilderdataobj: any;
  public variablepath:any;


  constructor(private gs: GlobalFormService, private activatedRoute: ActivatedRoute, private gt: GETDATA, private changeDetector: ChangeDetectorRef) {

  }




  ngOnInit() {



    this.formObj = [
      {
        "html": "singlefield",
        "name": "FIRSTNAME",
        "ClientName": "FIRSTNAME",
        "hidename": false,
        "type": "singleControl",
        "subtypehtml": "singlefield",
        "style": {
          "width": "60%"
        },
        "validation": {
          "required": true,
          "options": {
            "length": {
              "minCharlength": 3,
              "maxCharlength": 15
            },
            "datatype": { "Type": "string" }
          }
        }
      },
      {
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
        "name": "LASTNAME",
        "hidename": false,
        "style": {
          "width": "70%",
          "color": "black"
        },
        "textStyle": {
          "color": "black"
        },
        "ClientName": "LASTNAME",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "string" },
            "length": {
              "minCharlength": 3,
              "maxCharlength": 15
            }
          }
        }
      },
      {
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "date",
        "name": "DATE",
        "hidename": false,
        "style": {
          "width": "60%",
          "color": "black"
        },
        "textStyle": {
          "color": "black"
        },
        "ClientName": "DATE",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "any" },
            "length": {
              "minCharlength": 3,
              "maxCharlength": 40
            }
          }
        }
      },
      {
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
        "name": "EMAIL",
        "hidename": false,
        "style": {
          "width": "70%",
          "color": "black"
        },
        "textStyle": {
          "color": "black"
        },
        "ClientName": "EMAIL",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "any" },
            "patterns": [
              { "pattern": `^[a-zA-Z0-9_.-]{3,25}@[a-zA-Z]{3,15}.[a-zA-Z]{2,10}$`, "minMatch": 1 }
            ]
          }
        }
      },
      {
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
        "name": "PHONE",
        "hidename": false,
        "style": {
          "width": "30%",
          "color": "black"
        },
        "textStyle": {
          "color": "black"
        },
        "ClientName": "PHONE",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "any" },
            "patterns": [
              { "pattern": `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`, "minMatch": 1 }
            ]
          }
        }
      },
      {
        "html": "plainArray",
        "type": "plainArray",
        "name": "SHIPPINGINFO",
        "textStyle": {
          "color": "white"
        },
        "multiadder": false,
        "ClientName": "SHIPPINGINFO",
        "groupFields": [
          {
            "name": "ZIP",
            "ClientName": "ZIP",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "validation": {
              "required": true,
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          },
          {
            "name": "ADDRESS",
            "ClientName": "ADDRESS",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "validation": {
              "required": true,
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          },
          {
            "name": "CITY",
            "ClientName": "CITY",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "validation": {
              "required": true,
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          },
          {
            "name": "STATE",
            "ClientName": "STATE",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "validation": {
              "required": true,
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          }
        ]
      },

      {
        "html": "plainArray",
        "type": "plainArray",
        "name": "PRODUCTS",
        "textStyle": {
          "color": "white"
        },
        "multiadder": false,
        "ClientName": "PRODUCTS",
        "groupFields": [
          {
            "name": "QTY",
            "ClientName": "QTY",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "validation": {
              "required": true,
              "options": {
                "datatype": { "Type": "interger" }
              }
            }
          },
          {
            "name": "SPECID",
            "ClientName": "SPECID",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "validation": {
              "required": true,
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          }

        ]
      },

      {
        "name": "SUBTOTAl",
        "subtypehtml": "singlefield",
        "ClientName": "SUBTOTAl",
        "hidename": true,
        "type": "singleControl",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "float", "decimalPlace": 2 }
          }
        }
      },
      {
        "name": "TAXANDSHIPPING",
        "subtypehtml": "singlefield",
        "ClientName": "TAX AND SHIPPING",
        "hidename": true,
        "type": "singleControl",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "float", "decimalPlace": 2 }
          }
        }
      }
    ];




    this.dataobjvalues = localStorage.getItem(`SALESDATAFORM`)
    if (this.dataobjvalues) {
      //get SUBTOTAl to add up to singlecontrol val = 33.33 + singlecontrol val = 44.32 =>[]
      // console.log(this.dataobjvalues)
      // this.dataobjvalues = JSON.parse(this.dataobjvalues)
      // this.dataobjvalues["SUBTOTAl"] = 3233.22
      // this.dataobjvalues["TAXANDSHIPPING"] = 33.22
      this.dataobjvalues = JSON.stringify(this.dataobjvalues)
    }

    function calculateValues() {
      //send dataobjvalues with sub and tax only
    }
    this.formObj = JSON.stringify(this.formObj)
    var x:any = this.gs.getParamIndex("SALESDATAFORM")
    if (x.params && x){
      this.index = x.params['index']
      this.selectedValue = x.params['selectedValue']

    }

  }

  //make service to return makebigobject, s

  makebigobject() {

    if (parseInt(this.index) >= 1) {
      console.log("343 edit salesdata")
    } else {
      this.index = null
    }
    this.formbuilderdataobj = {}
    var RemoveKeysForSQL = [];
    var RemoveKeysForJSON = [];
    var IDMAP = {};
    var fileMap = {};
    //edit:parseInt(this.index)
    this.formbuilderdataobj["MainJsonData"] = { "DATA": {} }
    this.formbuilderdataobj["MANIPULATIONINFO"] = {
      "FileMap": null,
      "TABLENAME": "SALESDATAFORM",
      "TABLEID": "ID",
      "JSONFILEURL": null,
      "edit": parseInt(this.index),
      "jsonFileStartKey": null,
      "path": {
        "startpath": null,
        "containerfolder": null,
      }
    };
    this.formbuilderdataobj["SQLINFO"] = {
      "JSONKeyRemover": RemoveKeysForJSON,
      "SQLKeyRemover": RemoveKeysForSQL
    };
    this.formbuilderdataobj = JSON.stringify(this.formbuilderdataobj)
  }









}
