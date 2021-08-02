import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


export class customValidators {

  static hideshow(validation, name, mainformgroup, control: AbstractControl
  ): Observable<{ [key: string]: any }> {
    // if parent.parent get $name isvalid
    //contiue


    var newobservable = Observable.create(
      (observer: Observer<{ [key: string]: any }>) => {
        var isValid = false

        if (validation.showIf) {
          var isValid = true
          if (validation.showIf.judgeBy === 'value') {
            if (mainformgroup.get(name).value === validation.showIf.controlValue) {
try{
  mainformgroup.get(validation.showIf.FormShowHide).reset()
  mainformgroup.get(validation.showIf.FormShowHide).enable()

}catch{console.log("could not reset and enable custom validator")}


            } else {
              // supercontrol.get(data.showIf.FormShowHide).disable()
              try{
              if (!mainformgroup.get(validation.showIf.FormShowHide).disabled) {
                mainformgroup.get(validation.showIf.FormShowHide).disable()
              }
            }catch{
              console.log("could not disable customValidator")
            }
            }

          } else {
            //some valid

          }

        }


        if (isValid) {
          observer.next(null)
          observer.complete();
        }
      });

    return newobservable

  }





  static imageValidator(
    restraints, control: AbstractControl
  ): Observable<{ [key: string]: any }> {

    console.log("IMAGE VALIDATORRRRR")

    //  console.log(file)
    var newobservable = Observable.create(
      (observer: Observer<{ [key: string]: any }>) => {
        if (control) {
          var greenlight = false;
          var end = false;

          var minX;
          var minY;
          var maxX;
          var maxY;
          restraints = restraints.options
          Object.keys(restraints).forEach((key) => {

            switch (key) {
              case 'maxX':
                if (restraints.maxX !== null) {
                  try {
                    maxX = restraints.maxX

                    if (control.value.image_structure.width <= maxX) {
                      greenlight = true
                    } else {
                      end = null
                    }
                  }
                  catch{
                  }
                }
                break;

              case 'minX':
                if (restraints.minX !== null) {
                  try {
                    minX = restraints.minX
                    if (control.value.image_structure.width >= minX) {
                      greenlight = true
                    } else {
                      end = null
                    }
                  }
                  catch{
                    console.log("someerror")
                  }
                }
                break;

              case 'maxY':
                if (restraints.maxY !== null) {
                  maxY = restraints.maxY
                  try {

                    if (control.value.image_structure.height <= maxY) {
                      greenlight = true
                    } else {
                      end = null
                    }
                  }
                  catch{
                    console.log("someerror")
                  }
                }
                break;

              case 'minY':
                if (restraints.minY !== null) {
                  minY = restraints.minY
                  try {
                    if (control.value.image_structure.height >= minY) {
                      greenlight = true
                    } else {
                      end = null
                    }
                  }
                  catch{
                    console.log("someerror")
                  }
                }
                break;
            }

          })


          console.log("VALID?")
          console.log(greenlight && end !== null)

          if (greenlight && end !== null) {
            observer.next(null)
          } else {
            // control.status="INVALID"
            observer.next({ "failed": true })
          }
          observer.complete();

        }
        else {
          observer.next({ "failedNoFile": true })
          observer.complete();
        }

      })

    return newobservable;

    //end
  }















  //start of checkbox customValidators
  static checkboxValidator(data, control: FormControl): ValidatorFn {

    var newobservable = Observable.create(
      (observer: Observer<{ [key: string]: any }>) => {

        //control.parent.valid = true

        if (Object.values(control.parent.value).indexOf(true) !== -1) {

          observer.next(null)
        }
        else {

          observer.next({
            "NoBoxSelected": true,
            "formInvalid": true
          })


        }
        control.parent.statusChanges.subscribe((info) => {
          console.log(info)
        })
        control.parent.updateValueAndValidity()


        observer.complete()
      })
    return newobservable
  }

  //end of checkbox validator



  ///start of num validator

  static generalValidator(
    param, control: AbstractControl
  ): ValidatorFn {
    var newobservable = Observable.create(
      (observer: Observer<{ [key: string]: any }>) => {
        var arrayofbools = [];

        if (control.value && param.options) {
          var target = param.options

          for (let i in target) {
            function looper(obj, key) {


              if (obj instanceof Object && (typeof obj === "object") && Array.isArray(obj) === false) {


                Object.keys(obj).forEach(z => {
                  var k = z.toLowerCase()
                  var ncn = obj[z]
                  delete obj[z];
                  obj[k] = ncn
                  looper(obj[k], z)
                })

              }

              if (obj instanceof Array && Array.isArray(obj)) {
                obj.forEach(c => {
                  looper(c, null)
                })
              } else {
              }
            }
            looper(target, i)
          }

          Object.keys(param.options).forEach((key) => {
            var entry = param.options[key]
            var key = key.toLowerCase()
            switch (key) {
              case "length": {
                Charlength(entry)
              };
                break;
              case "datatype": {
                DataType(entry)
              };
                break;
              case "patterns": {
                Regex(entry)
              };
                break;
              case "compare": {
                Compare(entry)
              };
                break;
            }

          })


          function Compare(obj) {
            var comparename = obj.controlname
            if (control['_parent'].get(obj.controlname).value === control.value) {
              control['_parent'].get(obj.controlname).status = "VALID"
              arrayofbools.push(null)
            } else {
              control['_parent'].get(obj.controlname).status = "PENDING"
              arrayofbools.push(true)
            }
          }


          function DataType(obj) {
            function isNumeric(value: any): boolean {
              return !isNaN(value - parseFloat(value));
            }
            var z = isNumeric(control.value)
            var contiue = false
            switch (obj.type) {
              case "any": {
                arrayofbools.push(null)
              }
                break;
              case "float": {
                if (z) {
                  var n = control.value.toString()
                  function isFloat(n) {
                    // console.log(n)
                    // console.log(n.indexOf('.') != -1)
                    // console.log(!isNaN(n))
                    // console.log(Number(parseFloat(n)) === parseFloat(n))
                    if (!isNaN(n) && (n.toString().indexOf('.') != -1) && Number(parseFloat(n)) === parseFloat(n)) {
                      return true
                    } else {
                      return false
                    }
                  }
                  var answer = isFloat(n)
                  if (answer) {
                    function decimalCount(num) {
                      const numStr = num.toString();
                      if (numStr.includes('.')) {
                        return numStr.split('.')[1].length;
                      };
                      return 0;
                    }

                    var length = decimalCount(n)
                    if (obj.decimalplace) {
                      if (length == obj.decimalplace) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    } else {
                      arrayofbools.push(null)
                    }
                  } else { arrayofbools.push(false) }

                } else { arrayofbools.push(false) }
              }
                break;
              case "int": {
                if (z) {
                  function isInt(n) {
                    return n === n && n % 1 === 0;
                  }
                  var answer = isInt(Number(control.value))
                  contiue = answer
                  if (answer) { arrayofbools.push(null) }
                  else {
                    arrayofbools.push(false)
                  }
                } else {
                  arrayofbools.push(false)
                }
              }
                break;

              case "string": {
                var answer = "string" === typeof control.value
                function hasNumber(string) {
                  return /\d/.test(string);
                }
                var zx = hasNumber(control.value)
                if (answer && !zx) {
                  arrayofbools.push(null)
                } else {
                  arrayofbools.push(false)
                }
              }
                break
            }
          }
          function Regex(obj) {
            console.log(obj)
            if (obj) {
              obj.forEach((pat) => {
                if (pat) {

                  var regex = pat.pattern
                  //  console.log(pat.pattern)
                  // var pattern = "^[a-zA-Z0-9_.-]{3,25}@[a-zA-Z]{3,15}.[a-zA-Z]{2,10}$";
                  var pattern = pat.pattern
                  var nregex = new RegExp(pattern, 'g')
                  // console.log(control.value)
                  var result;
                  try { result = [...(control.value).matchAll(nregex)] }
                  catch{ console.log("ERROR in REGEX customValidator line382") }
                  // var result = [...(control.value).matchAll(nregex)]

                  //console.log(result)
                  if (result) {
                    //  console.log(result)

                    if (result.length >= 1) {
                      arrayofbools.push(null)
                    } else {
                      arrayofbools.push(false)
                    }
                    if (pat.minmatch) {
                      if (result.length >= pat.minmatch) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    }
                    if (pat.maxmatch) {
                      if (result.length <= pat.maxmatch) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    }

                  } else { console.log("resultproblem in regex") }


                }

              })
            }



          }






          function Charlength(obj) {
            if (obj.mincharlength) {
              if ((control.value).length >= obj.mincharlength) {
                arrayofbools.push(null)
              } else {
                arrayofbools.push(false)
              }
            }
            if (obj.maxcharlength) {
              if ((control.value).length <= obj.maxcharlength) {
                arrayofbools.push(null)
              } else {
                arrayofbools.push(false)
              }
            }
          }


          function numberValue(obj) {
            if (obj) {
              Object.keys(obj).forEach(k => {
                switch (k) {
                  case 'less':
                    if (obj.less !== null) {
                      var less = obj.less
                      if (control.value < less) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    }
                    break;

                  case 'lessEqual':
                    if (obj.lessEqual !== null) {
                      var lessEqual = obj.lessEqual
                      if (control.value <= lessEqual) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    }
                    break;

                  case 'equal':
                    if (obj.equal !== null) {
                      var equal = obj.equal
                      if (control.value === equal) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    }
                    break;

                  case 'greaterEqual':
                    if (obj.greaterEqual !== null) {
                      var greaterEqual = obj.greaterEqual
                      if (control.value >= greaterEqual) {
                        arrayofbools.push(null)
                      } else {
                        arrayofbools.push(false)
                      }
                    }
                    break;
                }

              })



            }




          }
          if (arrayofbools.indexOf(false) !== -1) {
            observer.next({ failed: true })
            observer.complete();
          }
          else {

            observer.next(null)
            observer.complete();
          }

        }
      })

    return newobservable
  }
  /*********************END NUMBER VALIDATOR********************************/







}
