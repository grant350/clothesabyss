import { Component, Input, OnInit, ViewChild, SimpleChanges, OnChanges, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GETDATA } from '../../../../getData.service';
import { GlobalFormService } from '../../../../globalformservice.service';

@Component({
  selector: 'app-productadd-form',
  templateUrl: './productadd-form.component.html',
  styleUrls: ['./productadd-form.component.scss']
})
export class ProductaddFormComponent implements OnInit {
  public formObj: any;
  public enabled = true;
  public index: any;
  public dataobjvalues: any;
  public selectedValue = "PRODUCTADDFORM";
  public formbuilderdataobj: any;
  public variablepath = "PRODUCTCATAGORY";

  constructor(private activatedRoute: ActivatedRoute, private gs: GlobalFormService, private gt: GETDATA, private changeDetector: ChangeDetectorRef) {
    // console.log(this.index)
  }

  //dataobjvalues not going formbuilder but index is

  ngOnInit() {
    this.formObj = [
      // {
      //   "html": "singleControl",
      //   "type": "singleControl",
      //   "name": "Age",
      //   "ClientName":"Age",
      //   "validation": {
      //     "required": true,
      //     "pattern": ".[0-9]$",
      //     "datatype": "int",
      //     "customValidator": "generalValidator",
      //     "validatorOptions":{
      //     "less": {
      //       "value": 100,
      //       "message": "sorry you are not old enough"
      //     },
      //     "equal": null,
      //     "greaterEqual": {
      //       "value": 18,
      //       "message": "sorry you are not old enough"
      //     }
      //   }
      //
      // }
      // },
      //  {
      //   "html":"singleControl",
      //   "type":"singleControl",
      //   "subtypehtml":"singleControl",
      //   "name":"USERNAME",
      //   "style":{
      //     "width":"60%",
      //     "height":"30px",
      //     "font-size":"16px"
      //   },
      //   "ClientName":"Username",
      //   "validation":{
      //    "required":true,
      //     "customValidator": "generalValidator",
      //
      //     "options":{
      //       "datatype":{ "Type":"any"},
      //
      //       "length":{
      //         "minCharlength":6,
      //       "maxCharlength":16
      //       //"equal":33
      //     },
      //       "patterns":[
      //         {"pattern":"[a-zA-Z]","minMatch":4,"maxMatch":10},
      //     {"pattern":"[0-9]","minmatch":4,"maxmatch":10}
      //   ]
      //
      //     }
      //   }
      // }
      // {
      //   "html": "options",
      //   "type": "singleControl",
      //   "name": "PLATFORMS",
      //   "ClientName":"DATE",
      //   "validation": {
      //     "required":true,
      //     "customValidator":"hideshow",
      //     "showIf":{
      //       "judgeBy":'value',
      //       "FormShowHide": "MULTISETPRODUCTS",
      //       "controlValue": "true"
      //     }
      //   },
      //
      //   "options":[
      //     "false",
      //     "true"
      //   ]
      //
      // },

      // {
      //   "subtypehtml": "singleControl",
      //   "type": "image",
      //   "name": "IMAGE",
      //   "hidename": false,
      //   "ClientName": "IMAGE",
      //   "validation": {
      //     "required": true,
      //     "customValidator": "imageValidator",
      //     "options": {
      //       "datatype": { "Type": "image" },
      //       "minX": 300,
      //       "maxX": 15000,
      //       "minY": 250,
      //       "maxY": 15000
      //     }
      //     // "filesizeLimit":20000,
      //     // "nameRestraintInclude":"blue",
      //     // "type":"jpg"
      //   }
      // },

      {
        "subtypehtml": "singleControl",
        "type": "options",
        "name": "CHOOSEOTHERPLATFORMS",
        "ClientName": "OTHERPLATFORMS EX(amazon,ebay)",
        "validation": {
          "required": true,
          "customValidator": "hideshow",
          "showIf": {
            "judgeBy": 'value',
            "FormShowHide": "OTHERPLATFORMS",
            "controlValue": "true"
          }
        },
        "style":{
           "height":"100px"
        },
        "options": [
          "false",
          "true"
        ]

      },

      {
        "subtypehtml": "singleControl",
        "type": "options",
        "name": "SHOWONSITE",
        "style":{
           "height":"100px"
        },
        "ClientName": "SHOW ON MAIN SITE",
        "validation": {
          "required": true,
        },
        "options": [
          "false",
          "true"
        ]
      },
      {
        "subtypehtml": "plainArray",
        "type": "plainArray",
        "name": "OTHERPLATFORMS",
        "textStyle": {
          "color": "black"
        },
        "multiadder": false,
        "hide": true,
        "showIf": {
          "formgroup": "OTHERPLATFORMS",
          "control": 'true',
          "equals": true
        },
        "ClientName": "PLATFORMS",
        "groupFields": [
          {
            "controls": [{
              "subtypehtml": "singleControl",
              "type": "date",
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
                "required": false,
              }
            },
            {
              "name": "PLATFORMNAME",
              "ClientName": "PLATFORM NAME Sold on",
              "hidename": false,
              "type": "singleControl",
              "subtypehtml": "singleControl",
              "validation": {
                "required": true,
                "options": {
                  "datatype": { "Type": "any" }
                }
              }
            },
            {
              "name": "PRODUCTTILE",
              "ClientName": "PRODUCTTILE",
              "hidename": false,
              "type": "singleControl",
              "subtypehtml": "singleControl",
              "style": {
                "width": "60%",
                "height": "40px"
              },
              "validation": {
                "required": true,
                "options": {
                  "length": {
                    "minCharlength": 20,
                    "maxCharlength": 80
                  },
                  "datatype": { "Type": "any" }
                }
              }
            },
            {
              "name": "SALEPRICE",
              "ClientName": "SALEPRICE",
              "hidename": false,
              "type": "singleControl",
              "subtypehtml": "singleControl",
              "validation": {
                "customValidator": "generalValidator",
                "required": true,
                "options": {
                  "datatype": { "Type": "float", "decimalplace": 2 }
                }
              }
            },
            {
              "name": "PRODUCTPRICE",
              "ClientName": "PRODUCTPRICE",
              "hidename": false,
              "type": "singleControl",
              "subtypehtml": "singleControl",
              "validation": {
                "customValidator": "generalValidator",
                "required": true,
                "options": {
                  "datatype": { "Type": "float", "decimalplace": 2 }
                }
              }
            },
            {
              "name": "SHIPPINGCOST",
              "ClientName": "SHIPPINGCOST",
              "hidename": false,
              "type": "singleControl",
              "subtypehtml": "singleControl",
              "validation": {
                "customValidator": "generalValidator",
                "required": true,
                "options": {
                  "datatype": { "Type": "float", "decimalplace": 2 }
                }
              }
            },
            {
              "name": "FEES",
              "ClientName": "FEES",
              "hidename": false,
              "type": "singleControl",
              "subtypehtml": "singleControl",
              "validation": {
                "customValidator": "generalValidator",
                "required": true,
                "options": {
                  "datatype": { "Type": "float", "decimalplace": 2 }
                }
              }
            }
            ]
}

        ]
      },
      // {
      //   "html": "multiform",
      //   "type": "formArray",
      //   "name": "PLATFORMS",
      //   "ClientName":"PLATFORMS",
      //   "multiadder":true,
      //   "hide":true,
      //   "showIf":{
      //     "formgroup":"OTHERPLATFORMS",
      //     "control":'true',
      //     "equals":true
      //   },
      //   "controls": [
      //     {
      //       "name": "PLATFORM",
      //       "type": "formGroup",
      //       "groupFields": [
      //         {
      //           "name": "PLATFORMNAME",
      //           "type": "field",
      //           "hidename":false,
      //           "validation":{
      //             "required":true,
      //              "customValidator": "generalValidator",
      //                 "options":{
      //                   "datatype":{ "Type":"any"},
      //                   "length":{
      //                     "minCharlength":2,
      //                   "maxCharlength":30
      //                 }
      //             }
      //           }
      //         },
      //         {
      //           "name": "PRODUCTTILE",
      //           "type": "field",
      //           "hidename":false,
      //           "validation":{
      //             "required":true,
      //              "customValidator": "generalValidator",
      //                 "options":{
      //                   "datatype":{ "Type":"any"},
      //                   "length":{
      //                     "minCharlength":10,
      //                   "maxCharlength":60
      //                 }
      //             }
      //           }
      //         },
      //         {
      //           "name": "SALEPRICE",
      //           "type": "field",
      //           "hidename":false,
      //           "validation":{
      //             "required":true,
      //              "customValidator": "generalValidator",
      //                 "options":{
      //                   "datatype":{ "Type":"float","decimalplace":2}
      //             }
      //           }
      //         },
      //         {
      //           "name": "PRODUCTPRICE",
      //           "type": "field",
      //           "hidename":false,
      //           "validation":{
      //             "required":true,
      //              "customValidator": "generalValidator",
      //                 "options":{
      //                   "datatype":{ "Type":"float","decimalplace":2}
      //             }
      //           }
      //         },
      //         {
      //           "name": "SHIPPINGCOST",
      //           "type": "field",
      //           "hidename":false,
      //           "validation":{
      //             "required":true,
      //              "customValidator": "generalValidator",
      //                 "options":{
      //                   "datatype":{ "Type":"float","decimalplace":2}
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   ]
      //   },
      {
        "type": "plainfield",
        "subtypehtml": "singleControl",
        "name": "COMPANYNAME",
        "textStyle": {
          "color": "black"
        },
        "style": {
          "width": "20%",
          "color": "black"
        },
        //add To platforms later work on!!
        "ClientName": "COMPANY/STORE (Name)",
        "valueAutoset": "clothesabyss",
        "validation": {
          "required": true,
          "textStyle": {
            "color": "black"
          },
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "any" },

            "length": {
              "minCharlength": 3,
              "maxCharlength": 25
            }
          }
        }
      },
      {
        "subtypehtml": "singleControl",
        "type": "plainfield",
        "name": "TYPE",
        "textStyle": {
          "color": "black"
        },
        "style": {
          "width": "20%"
        },
        "ClientName": "Type (product special displayed on site)",
        "validation": {
          "required": false
          // "customValidator": "generalValidator",
          // "options": {
          //   "datatype": { "Type": "any" },
          //
          //   "length": {
          //     "minCharlength": 3,
          //     "maxCharlength": 20
          //   }
        }
      },
      {
        "subtypehtml": "singleControl",
        "type": "plainfield",
        "name": "SUBCATAGORY",
        "textStyle": {
          "color": "black"
        },
        "style": {
          "width": "30%"
        },
        "ClientName": "Subcatagory",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "string" },

            "length": {
              "minCharlength": 3,
              "maxCharlength": 20
            }
          }
        }
      },
      {
        "subtypehtml": "singleControl",
        "type": "plainfield",
        "name": "PRODUCTNAME",
        "ClientName": "ProductName",
        "textStyle": {
          "color": "black"
        },
        "style": {
          "width": "30%",
          "color": "black"
        },
        "validation": {
          "required": false,
          // "customValidator": "generalValidator",
          // "options": {
          //   "datatype": { "Type": "any" },
          //
          //   "length": {
          //     "minCharlength": 4,
          //     "maxCharlength": 26
          //   }
          // }
        }

      },
      {
        "subtypehtml": "singleControl",
        "type": "textarea",
        "name": "TITLE",
        "textStyle": {
          "color": "black"
        },
        "style": {
          "width": "80%",
          "font-size": "16px"
        },
        "ClientName": "Title",
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "any" },

            "length": {
              "minCharlength": 10,
              "maxCharlength": 120
            }
          }
        }
      },
      {
        "subtypehtml": "singleControl",
        "type": "plainfield",
        "name": "PRODUCTCATAGORY",
        "ClientName": "ProductCatagory",
        "textStyle": {
          "color": "black"
        },
        "validation": {
          "required": true,
          "customValidator": "generalValidator",
          "options": {
            "datatype": { "Type": "string" },
            "length": {
              "minCharlength": 4,
              "maxCharlength": 20
            }
          }
        }
      },
      //make an array for paragraphs
      {
        "subtypehtml": "plainArray",
        "type": "plainArray",
        "name": "PARAGRAPHS",
        "textStyle": {
          "color": "black"
        },
        "ClientName": "Paragraphs",
        "multiadder": false,
        "groupFields": [
          {
            "controls": [
              {
                "name": "PARAGRAPH",
                "ClientName": "Paragraph",
                'type': "textarea",
                "hidename": false,
                "style": {
                  "width": "80%",
                  "font-size": "16px",
                  "height": "60px"
                },
                "validation": {
                  "required": false,
                  // "customValidator": "generalValidator",
                  // "options": {
                  //   "datatype": { "Type": "any" },
                  //   "length": {
                  //     "minCharlength": 0,
                  //     "maxCharlength": 100
                  //   }
                  // }
                }
              }
            ]

          }
        ]
      },
      {
        "subtypehtml": "plainArray",
        "type": "plainArray",
        "name": "SPECIFICATIONS",
        "ClientName": "SPECIFICATIONS",
        "multiadder": false,
        "groupFields": [
          {
            "controls": [{
              "name": "KEY",
              "ClientName": "KEY",
              'type': "plainfield",
              "validation": {
                "required": false,
                // "customValidator": "generalValidator",
                // "options": {
                //   "datatype": { "Type": "any" }
                // }
              }
            },
            {
              "name": "VALUE",
              "ClientName": "VALUE",
              'type': "plainfield",
              "validation": {
                "required": false,
                // "customValidator": "generalValidator",
                // "options": {
                //   "datatype": { "Type": "any" }
                // }
              }
            }]
          }
        ]
      },
      {
        "subtypehtml": "singleControl",
        "type": "options",
        "name": "MULTISETPRODUCTOPTIONS",
        "ClientName": "Multiset",
        "validation": {
          "required": true,
          "customValidator": "hideshow",
          "showIf": {
            "judgeBy": 'value',
            "FormShowHide": "MULTISETPRODUCTS",
            "controlValue": "true"
          }
        },
        "style":{"height":"100px"},
        "options": [
          "false",
          "true"
        ]

      },


      // {
      //   "html": "checkbox",
      //   "type": "formGroup",
      //   "name": "MultiSet",
      //   "ClientName":"MultiSet",
      //   "validation": {
      //     "required": false,
      //
      //           },
      //   "groupFields": [
      //     {
      //       "name": "true",
      //       "type": "field",
      //       "validation": {
      //         "required": false,
      //         "showIf":{
      //           "FormShowHide": "multiSetProducts",
      //           "control": "true",
      //           "isValid": null
      //         }
      //       }
      //     },
      //     {
      //       "name": "false",
      //       "type": "field",
      //       "validation": {
      //         "required": false,
      //         "set":true,
      //       }
      //     }
      //   ]
      // },

      {
        "subtypehtml": "multiform",
        "type": "formArray",
        "name": "MULTISETPRODUCTS",
        "ClientName": "MULTISETPRODUCTS",
        "multiadder": true,
        "hide": true,
        "showIf": {
          "formgroup": "MULTISETPRODUCTOPTIONS",
          "control": 'true',
          "equals": true
        },
        "multiformControls": [
          {
            "name": "PRODUCT",
            "subtypehtml": "formGroup",

            "controls": [
              {
                "name": "subProductImage",
                "subtypehtml": "singleControl",
                "type": "image",
                "hidename": false,
                "validation": {
                  "options": {
                    "datatype": { "Type": "image" },
                    "minX": 300,
                    "maxX": 15000,
                    "minY": 250,
                    "maxY": 15000
                  },
                  "required": true,
                  "customValidator": "imageValidator",

                  // "filesizeLimit":20000,
                  // "nameRestraintInclude":"blue",
                  // "type":"jpg"
                }
              },
              {
                "name": "PRODUCTNAME",
                "type": "plainfield",
                "hidename": false,
                "validation": {
                  "required": false,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "any" },
                    "length": {
                      "minCharlength": 5,
                      "maxCharlength": 30
                    }
                  }
                }
              },
              {
                "name": "plainfield",
                "type": "field",
                "hidename": false,
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "interger" }
                  }
                }
              }
            ]



          }
        ]
      },


      // {
      //   "subtypehtml": "formGroup",
      //   "type": "group",
      //   "name": "PERSONNAME",
      //   "multiadder": true,
      //   "hidename": false,
      //   "ClientName": "personname",
      //   "validation": {
      //     "required": true
      //   },
      //   "controls": [
      //     {
      //       "subtypehtml": "singleControl",
      //       "name": "FIRSTNAME",
      //       "type": "plainfield",
      //       "ClientName": "FIRSTNAME",
      //       "hidename": false,
      //       "validation": {
      //         "required": true,
      //         "customValidator": "generalValidator",
      //         "options": {
      //           "datatype": { "Type": "string" }
      //         }
      //       }
      //     },
      //     {
      //       "subtypehtml": "singleControl",
      //       "name": "LASTNAME",
      //       "ClientName": "LASTNAME",
      //       "type": "plainfield",
      //       "hidename": false,
      //       "validation": {
      //         "required": true,
      //         "customValidator": "generalValidator",
      //         "options": {
      //           "datatype": { "Type": "string" }
      //         }
      //       }
      //     }
      //
      //   ]
      //
      // },


      {
        "subtypehtml": "multiform",
        "type": "formArray",
        "name": "VARIENTS",
        "multiadder": true,
        "hidename": false,
        "ClientName": "Add Varients",
        "validation": {
          "required": true
        },
        "multiformControls": [

          {
            "name": "VARIENTINFO",
            "subtypehtml": "formGroup",
            "hidename": true,
            'ClientName': 'VARIENTINFO',
            "controls": [
              {
                "name": "MAINIMAGE",
                "subtypehtml": "singleControl",
                "type": "image",
                "hidename": true,
                "ClientName": "MAINIMAGE",
                "validation": {
                  "required": true,
                  "customValidator": "imageValidator",
                  "options": {
                    "datatype": { "Type": "image" },
                    "minX": 300,
                    "maxX": 15000,
                    "minY": 250,
                    "maxY": 15000
                  }
                  // "filesizeLimit":20000,
                  // "nameRestraintInclude":"blue",
                  // "type":"jpg"
                }
              },
              {
                "name": "SKU",
                "ClientName": "SKU/UPC",
                "hidename": true,
                "subtypehtml": "singleControl",
                "type": "plainfield",
                "style": {
                  "width": "60%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": false
                }
              },
              {
                "name": "INVENTORY",
                "ClientName": "INVENTORY",
                "hidename": true,
                "subtypehtml": "singleControl",
                "type": "plainfield",
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "int" },
                    "length": {
                      "minCharlength": 1,
                      "maxCharlength": 5
                    }
                  }
                }
              },
              {
                "name": "WEIGHT",
                "subtypehtml": "singleControl",
                "ClientName": "WEIGHT(Grams)",
                "hidename": true,
                "type": "plainfield",
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "int" },
                    "length": {
                      "minCharlength": 1,
                      "maxCharlength": 10
                    }
                  }
                }
              },
              {
                "name": "COST",
                "hidename": true,
                "subtypehtml": "singleControl",
                "type": "plainfield",
                "ClientName": "Cost",
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "float", "decimalplace": 2 }
                  }
                }
              },
              {
                "name": "PRODUCTPRICE",
                "type": "plainfield",
                "ClientName": "Product Price",
                "hidename": true,
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "float", "decimalPlace": 2 }
                  }
                }
              },
              {
                "name": "PRODUCTCONTENTS",
                "hidename": true,
                "type": "textarea",
                "style": {
                  "width": "60%",
                  "font-size": "16px",
                  "height": "80px"
                },
                "ClientName": "Product Content",
                "datatype": "textfield",
                "validation": {
                  "required": false
                }
              },
              {
                "name": "BINLOCATION",
                "hidename": true,
                "subtypehtml": "singleControl",
                "type": "plainfield",
                "ClientName": "BIN LOCATION",
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "any" },
                    "patterns": [
                      { "pattern": "^[Ll][0-9]{4}[Ff][0-9]{3}[sS][0-9]{4}[bB][0-9]{7}$", "minMatch": 1 }
                    ]
                  }
                }
              },
              {
                "name": "PRODUCTSALEPRICE",
                "hidename": true,
                "subtypehtml": "singleControl",
                "ClientName": "PRODUCT SALE PRICE",
                "type": "plainfield",
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "datatype": "float",
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "float", "decimalPlace": 2 }
                  }
                }
              }]

          },

          {
            "name": "LOCATION",
            "subtypehtml": "plainArray",
            "type": "plainArray",
            "ClientName": "LOCATION",
            "hidename": true,
            "style": {
              "padding": "0px",
              "margin": "0px",
              "width": "100%"
            },
            "substyle": {
            },
            "groupFields": [
              {
                "controls": [
                  {
                    "name": "LOCATIONFOUND",
                    "hidename": false,
                    "style": {
                      "width": "20%",
                      "font-size": "16px",
                      "height": "30px"
                    },
                    "ClientName": "LOCATIONFOUND address",
                    "type": "plainfield",
                    "datatype": "float",
                    "validation": {
                      "required": true,
                      "customValidator": "generalValidator",
                      "options": {
                        "datatype": { "Type": "any" }
                      }
                    }
                  },
                  {
                    "name": "NAMEOFSTORE",
                    "hidename": false,
                    "style": {
                      "width": "20%",
                      "font-size": "16px",
                      "height": "30px"
                    },
                    "subtypehtml": "singleControl",
                    "ClientName": "NAMEOFSTORE",
                    "type": "plainfield",
                    "datatype": "float",
                    "validation": {
                      "required": true,
                      "customValidator": "generalValidator",
                      "options": {
                        "datatype": { "Type": "string" }
                      }
                    }
                  }
                ]
              }],
            "styles": {
              "addButton": true
            }
          },

          {
            "name": "OPTIONS",
            "type": "plainArray",
            "subtypehtml": "plainArray",
            "ClientName": "OPTIONS (SPECIFICATIONS FOR VARIENTS)",
            "hidename": true,
            "style": {
              "padding": "0px",
              "margin": "0px",
              "width": "100%"

            },
            "substyle": {
            },
            "groupFields": [
              {
                "controls": [{
                  "name": "KEY",
                  "ClientName": "key",
                  "hidename": false,
                  "type": "plainfield",
                  "subtypehtml": "singleControl",
                  "validation": {
                    "required": true,
                    "options": {
                      "datatype": { "Type": "any" }
                    }
                  }
                },
                {
                  "name": "VALUE",
                  "ClientName": "VALUE",
                  "hidename": false,
                  "subtypehtml": "singleControl",
                  "type": "plainfield",
                  "validation": {
                    "required": true,
                    "options": {
                      "datatype": { "Type": "any" }
                    }
                  }
                }]
}

            ],
            "styles": {
              "addButton": true
            }

          },
          {
            "name": "IMAGEPAIR",
            "ClientName": "Image Pair",
            "type": "plainArray",
            "subtypehtml": "plainArray",
            "style": {
              "padding": "0px",
              "margin": "0px",
              "width": "100%"
            },
            "substyle": {
            },
            "groupFields": [
              {
                "controls": [{
                  "name": "ADDIMAGE",
                  "ClientName": "ADDIMAGE",
                  "subtypehtml": "singleControl",
                  "type": "image",

                  "hidename": false,
                  "validation": {
                    "required": true,
                    "customValidator": "imageValidator",
                    "options": {
                      "datatype": { "Type": "image" },
                      "minX": 300,
                      "maxX": 6000,
                      "minY": 250,
                      "maxY": 6000
                    }
                    // "filesizeLimit":20000,
                    // "nameRestraintInclude":"blue",
                    // "type":"jpg"
                  }
                }]
              }

            ],
            "styles": {
              "addButton": true
            }
          }
        ]
      }
    ];

    this.dataobjvalues = localStorage.getItem(`PRODUCTFORM`)
    console.log("line 975")
    this.variablepath = "PRODUCTCATAGORY"
    this.formObj = JSON.stringify(this.formObj)
    var x: any = this.gs.getParamIndex("PRODUCTADDFORM")
    if (x.params && x) {
      this.index = x.params['index']
      this.selectedValue = x.params['selectedValue']
    }
  };

  reloadTree() {
    this.enabled = false;
    // now notify angular to check for updates
    this.changeDetector.detectChanges();
    // change detection should remove the component now
    // then we can enable it again to create a new instance
    this.enabled = true;
  }



}
