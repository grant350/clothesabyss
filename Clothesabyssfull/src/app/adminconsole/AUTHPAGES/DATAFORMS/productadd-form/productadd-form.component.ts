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
public selectedValue="PRODUCTADDFORM";
public formbuilderdataobj: any;
public variablepath="PRODUCTCATAGORY";

  constructor(private activatedRoute: ActivatedRoute,private gs: GlobalFormService, private gt: GETDATA, private changeDetector: ChangeDetectorRef) {
    // console.log(this.index)
  }

  //dataobjvalues not going formbuilder but index is

  ngOnInit() {
    this.formObj = [
      // {
      //   "html": "singlefield",
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
      //   "html":"singlefield",
      //   "type":"singleControl",
      //   "subtypehtml":"singlefield",
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
      {
        "html": "options",
        "type": "singleControl",
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

        "options": [
          "false",
          "true"
        ]

      },
      {
        "html": "options",
        "type": "singleControl",
        "name": "SHOWONSITE",
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
        "html": "plainArray",
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
              "required": false,
            }
          },
          {
            "name": "PLATFORMNAME",
            "ClientName": "PLATFORM NAME Sold on",
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
            "name": "PRODUCTTILE",
            "ClientName": "PRODUCTTILE",
            "hidename": false,
            "type": "singleControl",
            "subtypehtml": "singlefield",
            "style": {
              "width": "60%",
              "height":"40px"
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
            "subtypehtml": "singlefield",
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
            "subtypehtml": "singlefield",
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
            "subtypehtml": "singlefield",
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
            "subtypehtml": "singlefield",
            "validation": {
              "customValidator": "generalValidator",
              "required": true,
              "options": {
                "datatype": { "Type": "float", "decimalplace": 2 }
              }
            }
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
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
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
        "valueAutoset":"clothesabyss",
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
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "singlefield",
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
        "html": "singlefield",
        "type": "singleControl",
        "name": "SUBCATAGORY",
        "subtypehtml": "singlefield",
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
        "html": "singlefield",
        "type": "singleControl",
        "name": "PRODUCTNAME",
        "subtypehtml": "singlefield",
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
        "html": "singlefield",
        "type": "singleControl",
        "subtypehtml": "textarea",
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
        "html": "singlefield",
        "type": "singleControl",
        "name": "PRODUCTCATAGORY",
        "subtypehtml": "singlefield",
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
        "html": "plainArray",
        "type": "plainArray",
        "name": "PARAGRAPHS",
        "textStyle": {
          "color": "black"
        },
        "ClientName": "Paragraphs",
        "multiadder": false,
        "groupFields": [
          {
            "name": "PARAGRAPH",
            "ClientName": "Paragraph",
            'subtypehtml': "textarea",
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
      },
      {
        "html": "plainArray",
        "type": "plainArray",
        "name": "SPECIFICATIONS",
        "ClientName": "SPECIFICATIONS",
        "multiadder": false,
        "groupFields": [
          {
            "name": "KEY",
            "ClientName": "KEY",
            'subtypehtml': "singlefield",
            "validation": {
              "required": true,
              "customValidator": "generalValidator",
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          },
          {
            "name": "VALUE",
            "ClientName": "VALUE",
            'subtypehtml': "singlefield",
            "validation": {
              "required": true,
              "customValidator": "generalValidator",
              "options": {
                "datatype": { "Type": "any" }
              }
            }
          }
        ]
      },
      {
        "html": "options",
        "type": "singleControl",
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
        "html": "multiform",
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
        "controls": [
          {
            "name": "PRODUCT",
            "type": "formGroup",
            "groupFields": [
              {
                "name": "subProductImage",
                "subtypehtml": "singlefield",
                "datatype": "image",
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
                "type": "field",
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
                "name": "PRODUCTSPEC",
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

      {
        "html": "multiform",
        "type": "formArray",
        "name": "VARIENTS",
        "multiadder": true,
        "hidename": false,
        "ClientName": "Add Varients",
        "validation": {
          "required": true
        },
        "controls": [
          {
            "name": "VARIENTINFO",
            "type": "formGroup",
            "hidename": true,
            'ClientName': 'VARIENTINFO',
            "groupFields": [
              {
                "name": "MAINIMAGE",
                "subtypehtml": "image",
                "type": "singleControl",
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
                "subtypehtml": "singlefield",
                "type": "singleControl",
                "style": {
                  "width": "60%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "validation": {
                  "required": false,
                  // "customValidator": "generalValidator",
                  // "options": {
                  //   "datatype": { "Type": "any" },
                  //   "length": {
                  //     "minCharlength": 8,
                  //     "maxCharlength": 22
                  //   }
                  // }
                }
              },
              {
                "name": "INVENTORY",
                "ClientName": "INVENTORY",
                "hidename": true,
                "subtypehtml": "singlefield",
                "type": "singleControl",
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
                "subtypehtml": "singlefield",
                "ClientName": "WEIGHT(Grams)",
                "hidename": true,
                "type": "singleControl",
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
                "subtypehtml": "singlefield",
                "type": "singleControl",
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
                "subtypehtml": "singlefield",
                "ClientName": "Product Price",
                "hidename": true,
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
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
                "name": "PRODUCTCONTENTS",
                "hidename": true,
                "subtypehtml": "textarea",
                "style": {
                  "width": "60%",
                  "font-size": "16px",
                  "height": "80px"
                },
                "ClientName": "Product Content",
                "type": "singleControl",
                "datatype": "textfield",
                "validation": {
                  "required": false
                }
              },
              {
                "name": "BINLOCATION",
                "hidename": true,
                "subtypehtml": "singlefield",
                "type": "singleControl",
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
                "subtypehtml": "singlefield",
                "ClientName": "PRODUCT SALE PRICE",
                "type": "singleControl",
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
              }
            ]
          },
          {
            "name": "LOCATION",
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
            "groupFields": [  {
                "name": "LOCATIONFOUND",
                "hidename": false,
                "style": {
                  "width": "20%",
                  "font-size": "16px",
                  "height": "30px"
                },
                "subtypehtml": "singlefield",
                "ClientName": "LOCATIONFOUND address",
                "type": "singleControl",
                "datatype": "float",
                "validation": {
                  "required": true,
                  "customValidator": "generalValidator",
                  "options": {
                    "datatype": { "Type": "string" }
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
                 "subtypehtml": "singlefield",
                 "ClientName": "NAMEOFSTORE",
                 "type": "singleControl",
                 "datatype": "float",
                 "validation": {
                   "required": true,
                   "customValidator": "generalValidator",
                   "options": {
                     "datatype": { "Type": "string" }
                   }
                 }
               }
            ],
              "styles": {
                "addButton": true
              }
          },

          {
            "name": "OPTIONS",
            "type": "plainArray",
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
                "name": "KEY",
                "ClientName": "key",
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
                "name": "VALUE",
                "ClientName": "VALUE",
                "hidename": false,
                "subtypehtml": "singlefield",
                "type": "singleControl",
                "validation": {
                  "required": true,
                  "options": {
                    "datatype": { "Type": "any" }
                  }
                }
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
            "style": {
              "padding": "0px",
              "margin": "0px",
              "width": "100%"
            },
            "substyle": {
            },
            "groupFields": [
              {
                "name": "ADDIMAGE",
                "ClientName": "ADDIMAGE",
                "subtypehtml": "image",
                "type": "singleControl",
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
    var x:any = this.gs.getParamIndex("PRODUCTADDFORM")
    if (x.params && x){
      this.index = x.params['index']
      this.selectedValue = x.params['selectedValue']
    }
    this.makebigobject();
  };


  makebigobject() {

    if (parseInt(this.index) >= 1) {
      console.log("343 edit salesdata")
    } else {
      this.index = null
    }
    this.formbuilderdataobj = {}
    this.formbuilderdataobj["MainJsonData"] = { }

    console.log(this.index)
    var RemoveKeysForSQL = [];
    var RemoveKeysForJSON = [];
    var IDMAP = {};
    var fileMap = {};
    //edit:parseInt(this.index)
    RemoveKeysForSQL = [
     "AGE",
     "MULTISET",
     "GENDERS",
     "MULTISETPRODUCTOPTIONS",
     "CHOOSEOTHERPLATFORMS",
   ];

   RemoveKeysForJSON = [
     "AGE",
     "MULTISET",
     "GENDERS",
     "BINLOCATION",
     "COST",
     "SUPPLIER",
     "MULTISETPRODUCTOPTIONS",
     "MANIPULATIONINFO",
     "CHOOSEOTHERPLATFORMS"

   ];

      console.log(fileMap)
    this.formbuilderdataobj["MANIPULATIONINFO"] = {
      "FileMap": {
        "VARIENTS": "VARIENT",
        "MULTISETPRODUCTS": "MULTISETPRODUCTS"
      },
      "TABLENAME": "PRODUCTFORM",
      "TABLEID": "PRODUCTID",
      "edit": parseInt(this.index),
      "JSONFileIDMap": {
        "PRODUCTS":"PRODUCTID",
        "VARIENTS":"SPECID"
      },
      "jsonFileStartKey": "PRODUCTS",
      "JSONFILEURL":"src/assets/productCatagories/products.json",
      "path": {
        "startpath": "src/assets/productCatagories/productImages/",
        "containerfolder": "product",
      }
    };
    this.formbuilderdataobj["datastripperObjs"] = {
      "JSONKeyRemover": RemoveKeysForJSON,
      "SQLKeyRemover": RemoveKeysForSQL
    };

    console.log(this.formbuilderdataobj)


    this.formbuilderdataobj = JSON.stringify(this.formbuilderdataobj)

  }






















  reloadTree() {
    this.enabled = false;
    // now notify angular to check for updates
    this.changeDetector.detectChanges();
    // change detection should remove the component now
    // then we can enable it again to create a new instance
    this.enabled = true;
  }



}
