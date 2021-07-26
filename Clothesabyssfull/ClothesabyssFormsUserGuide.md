



# html: name of the form model using in the form
  * singlefield
  * checkbox
  * multiform
# type: type of form control to tell the program to use a formarray or group ect.
# name: The name of the input also rn the label
# validation: object of validation methods
# required: tells the program to use validation or not = true|false
# pattern: regex used in template binding
# customValidator: name of function to use as customValidator
# numberValidator: sub obj {value,message}
  * less: if inputvalue is < than number given
  * lessEqual: if inputvalue is <= than number given
  * greater: if inputvalue is > than number given
  * greaterEqual: if inputvalue is >= than number given

# imageValidator: ?
* minW: if image file width is >= minW
* minH: if image file height is >= minH
* maxW: if image file width is <= maxW
* maxH: if image file height is <= maxH = '30' + px
* maxFileSize: '2gb','3mg','4999kb'


# groupFields: array of fields if in type formgroup
* type: field is required
* datatype: is not required but reccomended
* validation: not required but definitly reccomended
  ```javascript
  {
    "name": "red",
    "type": "field",
    "datatype": "image",
    "validation":{
      "required":false
    }
  }
  ```



# This is a whole test Form thats complex when using this object make sure to use this.formobj = []

```javascript
{ "formobj": [
      {
        "html": "singlefield",
        "type": "singleControl",
        "name": "Age",
        "validation": {
          "required":true,
          "pattern":".[0-9]$",
          "customValidator": "numberValidator",
          "less":{
            "value":100,
            "message":"sorry you are not old enough"
          },
          "equal":null,
          "greaterEqual": {
            "value":18,
            "message":"sorry you are not old enough"
          }
        }
      },

      {
        "html": "checkbox",
        "type": "formGroup",
        "name": "Colors",
        "validation": {
          "required":true
        },
        "groupFields": [
          {
            "name": "red",
            "type": "field",
            "validation":{
              "required":false
            }
          },
          {
            "name": "yellow",
            "type": "field",
            "validation":{
              "required":false
            }           },
          {
            "name": "blue",
            "type": "field",
            "validation":{
              "required":false
            }           },
          {
            "name": "orange",
            "type": "field",
            "validation":{
              "required":false
            }           }
        ]
      },
      {
        "html": "checkbox",
        "type": "formGroup",
        "name": "People",
        "validation": {
          "required":true
        },
        "groupFields": [
          {
            "name": "Brandy",
            "type": "field",
            "validation":{
              "required":false
            }           },
          {
            "name": "Grant",
            "type": "field",
            "validation":{
              "required":false
            }           },
          {
            "name": "Christian",
            "type": "field",
            "validation":{
              "required":false
            }           },
          {
            "name": "Troy",
            "type": "field",
            "validation":{
              "required":false
            }           }
        ]
      },
      {
        "html": "multiform",
        "type": "formArray",
        "name": "AddVarient",
        "validation": {
          "required":true
        },
        "controls": [
          {
            "name": "varient",
            "type": "formGroup",
            "groupFields": [
              {
                "name": "mainImage",
                "type": "field",
                "datatype": "image",
                "validation": {
                  "required":true,
                  "customValidator": "imageValidator",
                  "imageMinX":300,
                  "imageMinY":300,
                  "imageMaxX":800,
                  "imageMaxY":800,
                  "imageShapeRatio":[1,1],
                  "imageSpaceSizeLimit":"1mg"
                }
              },
              {
                "name": "inventory",
                "type": "field",
                "datatype": "interger",
                "validation": {
                  "required":true,
                  "pattern":".[0-9]$",
                  "customValidator": "numberValidator",
                  "less":null,
                  "equal":null,
                  "greaterEqual": {
                    "value":0,
                    "message":"sorry you are not old enough"
                  }
                }
              },
              {
                "name": "sku",
                "type": "field",
                "datatype": "interger",
                "validation":{
                  "required":true
                }
              },
              {
                "name": "weight",
                "type": "field",
                "datatype": "float",
                "validation":{
                  "required":true
                }
              },
              {
                "name": "cost",
                "type": "field",
                "datatype": "float",
                "validation":{
                  "required":true
                }
              },
              {
                "name": "productExtInfo",
                "type": "field",
                "datatype": "string",
                "validation":{
                  "required":true
                }
              },
              {
                "name": "productPrice",
                "type": "field",
                "datatype": "float",
                "validation":{
                  "required":true
                }
              },
              {
                "name": "productSalePrice",
                "type": "field",
                "datatype": "float",
                "validation":{
                  "required":true
                }
              }
            ]
          },



          {
            "name": "options",
            "type": "formArray",
            "controls": [
              {
                "groupFields": [
                  {
                    "name": "key",
                    "type": "field",
                    "datatype": "string",
                    "validation":{
                      "required":false
                    }
                  },
                  {
                    "name": "value",
                    "type": "field",
                    "datatype": "any",
                    "validation":{
                      "required":false
                    }
                  }
                ]
              }

            ],

            "styles": {
              "addButton":true,
            }



          },
          {
            "name": "image_pair",
            "type": "formArray",
            "controls": [
              {
                "groupFields": [
                  {
                    "name": "addimage",
                    "type": "field",
                    "datatype": "image",
                    "validation":{
                      "required":true
                    }
                  }
                ]
              }
            ],
            "styles": {
              "addButton":true
            }
          }
        ]
      }
]
}
```
