import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GETDATA } from '../../../getData.service';

@Component({
  selector: 'app-mappage',
  templateUrl: './mappage.component.html',
  styleUrls: ['./mappage.component.scss']
})
export class MappageComponent implements OnInit {
  public dataobjvalues: any;
  public formObj: any;
  public selectedValue = "addMapData"
  constructor(private activatedRoute: ActivatedRoute, private gt: GETDATA) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      //   var mapdata=null
      //   var mapdata=null
      var maincookie = localStorage.getItem('mapdata')
      //
      //   try {
      //     mapdata=JSON.parse(maincookie)
      //     console.log(mapdata)
      //     console.log("mapdata Line 24")
      //     var newarray = mapdata.filter(maprow => (maprow['mapID']).toString() === (params['index'].toString() ) )
      //
      //     console.log(newarray)
      //     maprow = newarray[0]
      //     console.log(mapdata)
      //     this.dataobjValues=mapdata
      //     this.dataobjValues["ID"]=mapdata["mapdataID"]
      //   }
      //   catch{
      //     console.log("no parse")
      //mapdata=null
      //     mapdata=null
      //   }
      //
    });

  }

  ngOnInit() {

    this.formObj = [
      {
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
        "name": "FIRSTNAME",
        "style": {
          "width": "20%",
          "color": "black"
        },
        "textStyle": {
          "color": "white"
        },
        "errorMessageStyle": {
          "width": "60%"
        },
        "ClientName": "firstname",
        "validation": {
          "required": false
        }
      },
      {
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
        "name": ":LASTNAME",
        "style": {
          "width": "20%",
          "color": "black"
        },
        "textStyle": {
          "color": "white"
        },
        "errorMessageStyle": {
          "width": "60%"
        },
        "ClientName": "lastname",
        "validation": {
          "required": false
        }
      },
      {
  "html": "singlefield",
    "type": "singleControl",
      "subtypehtml": "textarea",
        "name": "ADDRESS",
          "hidename": false,
  "style": {
    "width": "60%",
    "color": "black"
  },
  "textStyle": {
    "color": "white"
  },
  "ClientName": "ADDRESS",
    "validation": {
    "required": true,
      "customValidator": "generalValidator",
        "options": {
      "datatype": { "Type": "any" },
      "length": {
        "minCharlength": 10,
          "maxCharlength": 105
      }
    }
  }
},
{
  "html": "singlefield",
    "type": "singleControl",
      "subtypehtml": "image",
        "name": "PRODUCTIMAGE",
          "hidename": false,
            "style": {
    "width": "60%",
    "color":"black"
  },
  "textStyle": {
    "color": "white"
  },
  "ClientName": "PRODUCTIMAGE",
    "validation": {
    "required": false,
      "customValidator": "generalValidator",
        "options": {
      "datatype": { "Type": "image" }
    }
  }
},
{
  "html": "singlefield",
    "type": "singleControl",
      "subtypehtml": "singlefield",
        "name": "PRODUCTSPECID",
          "hidename": false,
  "style": {
"width": "60%",
"color":"black"
},
"textStyle": {
"color": "white"
},
  "ClientName": "PRODUCTSPECID",
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
      "subtypehtml": "date",
        "name": "DATE",
          "hidename": false,
  "style": {
"width": "60%",
"color":"black"
},
"textStyle": {
"color": "white"
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
}




    ];
  }





}
