import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Subscription ,Subject,Observable, of} from 'rxjs';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { FormSubmitting } from '../../../../formsubmiting.service';
import { GETDATA } from '../../../../getData.service';

@Component({
  selector: 'app-pick-data',
  templateUrl: './pick-data.component.html',
  styleUrls: ['./pick-data.component.scss']
})
export class PickDataComponent implements OnInit {
public selectedValue=null;
public dataFormsDisplay:any;
public dataForms={"SALESDATAFORM":"linear","PRODUCTFORM":"linear"}
public OBJECT=Object
public graphtype:any;
public items:any;
public arraykeys:any=[];
public makegraph=false
public key:any;
constructor(private router:Router, private gt: GETDATA) { }


addkey(key){
  console.log("line 25 add key ")
  console.log(key)
  this.arraykeys.push(key)
}

done(){
  this.makegraph = true
}
onclick(selectedValue){

  this.graphtype=this.dataForms[selectedValue]
  var za = this.gt.getData(selectedValue)
  console.log(za)
  var a = this.gt.getAuthListener()
  console.log(a)
  a.subscribe(z=>{
    console.log(z)
    this.items=JSON.parse(z)['data']
    console.log(this.items)

    if (this.items[0].hasOwnProperty("DATA")||this.items[0].hasOwnProperty("data")){
      this.items.forEach(i=>{
        console.log(i)
   var newi = {};
        Object.keys(i).forEach(k=>{
          console.log(k)

          if (k.toLowerCase() === "date"){
            i["SQLDATE"] = i["DATE"]
            delete i["DATE"]
          }

          if (k.toLowerCase() === "data"){
            try{
              Object.keys(i[k]).forEach(key=>{
                console.log(key)
                if (key === "DATE"){
                    i["DATADATE"]=i[k][key]
                }else{
                  i[key]=i[k][key]
                }

              })
            }catch{
              console.log("ERROR CHUCHU")
            }
          }
        })
        delete i['data']
        delete i['DATA']
        //doesnt do lowercase DATA
      })
      }
      console.log("SETTING DATA FOR GRAPPH line 65")


  console.log(this.items)
  })
  this.items=JSON.stringify(this.items)
//set graph
}

ngOnInit() {

}

   EDITPage(selectedValue){
    this.router.navigate(['adminconsole/AUTHPAGES/DATAFORMS/GlobalEditPage'],{ queryParams: {selectedValue:selectedValue} } )
   }

   ADDPage(selectedValue){
     localStorage.removeItem(`${selectedValue}`)
    this.router.navigate([`adminconsole/AUTHPAGES/DATAFORMS/GlobalAddPage/${selectedValue}`],{ queryParams: {selectedValue:selectedValue} } )
   }






}
