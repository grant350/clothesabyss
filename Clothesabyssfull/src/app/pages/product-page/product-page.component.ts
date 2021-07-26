import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Renderer2, ViewChildren, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../../products.service';
import { Observable, Subscription } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common/'
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { CartService } from '../../cartservice.service';
import { GETDATA } from '../../getData.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public arrayofoptions: any = [];
  public productId;
  public numberofunits = 1;
  public selectednumberofunits
  public thumbnails=[]
  public number:any;
  public onthumb:any;
  public arrayUnd: any = [];
  public arrayOfKeys: any = [];
  public indexsallowed = [];
  public formgroups: FormGroup;
  public onthum:any;
  public VARIENTLENGTH;
  public OPTIONSARRAY:any;
  public Object=Object
public ProductObj:any={
};
public onspecProduct={}
public mathmatics={
  "subtotal":0.00
}

  @ViewChild("submenuinfo", { static: false } as any) submenuinfo: ElementRef;
  @ViewChild("contentbox", { static: false } as any) contentbox: ElementRef;
  @ViewChild("featuredImage", { static: false } as any) featuredImage: ElementRef;
  @ViewChild("lightbox", { static: false } as any) lightbox: ElementRef;


  constructor(private elementRef: ElementRef, private activatedRoute: ActivatedRoute, private dataservice: DataService,private cartservice: CartService, private renderer: Renderer2, private fb: FormBuilder, private route: ActivatedRoute,
    private getData:GETDATA
  ) {


  }

  //func


  makeformGroups(){
    //  [{key: "size", value: "53"},{key: "size", value: "33"},{key: "color", value: "red"},{key: "color", value: "orange"},{key: "color", value: "red"},{key: "color", value: "yellow"},{key: "color", value: "orange"},{key: "color", value: "blue"}];
    var array=[]
    var array_elements=this.arrayofoptions
    var optionsObjectArrays={}
    array.forEach((o,index)=>{
    array[index]=JSON.stringify(o)
    })
    console.log(array)

    array_elements.forEach((obj)=>{
      console.log(array.indexOf(JSON.stringify(obj)))

    if (array.indexOf(JSON.stringify(obj)) === -1){
    console.log("obj not in array" )
        array.push(JSON.stringify(obj))
    }else{
    console.log("repeat")
    }
    })
    console.log(array)
    array.forEach((o,index)=>{
    array[index]=JSON.parse(o)
    })
    console.log(array)
    array.forEach(o=>{
      console.log(o)
      if (optionsObjectArrays.hasOwnProperty(o['key'])){
         optionsObjectArrays[o['key']].push(o['value'])
      }else{
        optionsObjectArrays[o['key']]=[]
        optionsObjectArrays[o['key']].push(o['value'])
      }
      this.OPTIONSARRAY=optionsObjectArrays

    })
    }
  thumbnailsf(x) {
    let _that = this;
    _that.thumbnails.splice(0, 2000)
    _that.onthumb = _that.ProductObj['VARIENTS'][x]['VARIENTINFO']['MAINIMAGE']['path']
console.log("ON THUMB")
console.log(this.onthumb)
    _that.onspecProduct["VARIENTINFO"] = _that.ProductObj['VARIENTS'][x]['VARIENTINFO']
    _that.onspecProduct["OPTIONS"] = _that.ProductObj['VARIENTS'][x]['OPTIONS']
    _that.onspecProduct["IMAGEPAIR"] = _that.ProductObj['VARIENTS'][x]['IMAGEPAIR']
    console.log(_that.onspecProduct)
  }

  repeat(au, aop) {
//     console.log("AU")
//     console.log(au)
//     console.log("aop")
//     console.log(aop)
//
//     let _that = this;
//     _that.arrayOfKeys.splice(0,200)
//     aop.forEach((l) => {
//
//       var a: any = Object.keys(l)
//       var b: any = Object.values(l)[0]
//       var c: any = b.values
//       isRepeat(a[0], c, l)
//     })
//
//     function isRepeat(k, z, obj) {
//       if (!au.some(x => x.hasOwnProperty(k))) {
//         au.push(obj)
//         let a = Object.keys(obj)
//         _that.arrayOfKeys.push(k)
//       }
//       else {
//
//         au.forEach((objects, index) => {
//           if (objects.hasOwnProperty(k)) {
//             var pushable = objects[k]["values"]
//             //console.log(pushable)
//             for (let i = 0; i < z.length; i++) {
//               var item = z[i]
//
//               if (objects[k]["values"].indexOf(item) === -1) {
//                 au[index][k]['values'].push(item)
//               }
//
//             }
//
//           }
//         })
//         //end
//       }
//
//     }
//     this.arrayUnd = au
// console.log(this.arrayUnd)
  }


  up() {
    if (this.numberofunits < this.onspecProduct["VARIENTINFO"]["INVENTORY"]) {
      this.numberofunits += 1
    }
  }
  down() {
    if (this.numberofunits >= 2) {
      this.numberofunits -= 1
    }

  }
  quant(event){
   const inputValue = event.target.value;
   console.log(inputValue)

   if (inputValue > this.onspecProduct["VARIENTINFO"]["INVENTORY"]){
     this.numberofunits = this.onspecProduct["VARIENTINFO"]["INVENTORY"]
   }

   if (inputValue <= 0){
     this.numberofunits = 1
   }

  }
//this.cartservice.up()
//this.cartservice.down()

  dropDownInfo(event) {
    if (event.currentTarget.nextSibling.classList.contains("open")) {
      this.renderer.removeClass(
        event.currentTarget.nextSibling, "open")
      this.renderer.addClass(
        event.currentTarget.nextSibling, "close")
    }
    else {
      this.renderer.removeClass(
        event.currentTarget.nextSibling, "close")
      this.renderer.addClass(
        event.currentTarget.nextSibling, "open")
    }
  }

  onClick(event) {
    if (!this.contentbox.nativeElement.contains(event.target)) {
      this.renderer.removeClass(
        this.submenuinfo.nativeElement, "open")
      this.renderer.addClass(
        this.submenuinfo.nativeElement, "close")
    }
  }

  changeimg(event) {
    this.renderer.setAttribute(
      this.featuredImage.nativeElement, 'src', event.currentTarget.src)
  }

  onSubmit(f, event) {


    //checks if valid works
console.log(f)
this.selectednumberofunits = this.numberofunits
this.onspecProduct["OPTIONS"] = f.value
    if (this.formgroups.valid === true) {
      console.log("yes")
      this.mathmatics.subtotal = (Math.round( (this.onspecProduct["VARIENTINFO"]["PRODUCTPRICE"] * this.numberofunits) * 100.0) / 100)

      let check = this.cartservice.getItems().some( (t)=> t.productSpec === this.onspecProduct['SPECID']  )
      console.log(check)
      if (check === false){
      this.cartservice.addToCart(this.onspecProduct['SPECID'], this.onspecProduct)
      }
      this.cartservice.getItems()
      this.renderer.addClass(this.lightbox.nativeElement, "animation-modalbox")
    //  this.renderer.setStyle(this.lightbox.nativeElement, "display", "flex")
      //this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, "position", "fixed")
      window.scroll(0,0);
    }

  }

exit(){
  this.renderer.removeClass(this.lightbox.nativeElement, "animation-modalbox")
}
  eom(e, f) {
    console.log(e)
    console.log(f)
// keep this

  //   let _that = this
  //   var indexsallowed = _that.indexsallowed
  //   var checkvalues = f.value
  //   var arraycopy = JSON.parse(JSON.stringify(_that.arrayofoptions));
  //   var current = []
  //   var popindex = []
  //   var firstselectedindex = []
  //   var newarray = []
  //   var first = []
  //   if (_that.arrayofoptions.length>0){
  //     this.arrayUnd.splice(0, 2000)
  //
  //   function box(arraycopy) {
  //
  //     var a = arraycopy.forEach((obj, index) => {
  //       var key = Object.keys(obj)[0]
  //
  //       if (obj[key].values.length > 0) {
  //         if (obj[key].values.indexOf(checkvalues[key]) !== -1) {
  //           if (first.length <= 0) {
  //             first.push(key)
  //             _that.thumbnailsf(obj[key].id - 1)
  //
  //           }
  //           newarray.push(parseInt(obj[key].id))
  //           console.log(newarray)
  //         }
  //       }
  //     })
  //     var counts = {}, max = 0, res;
  //     for (var v in newarray) {
  //       counts[newarray[v]] = (counts[newarray[v]] || 0) + 1;
  //       if (counts[newarray[v]] > max) {
  //         max = counts[newarray[v]];
  //         res = newarray[v];
  //       }
  //
  //     }
  //     var results = [];
  //     for (var k in counts) {
  //       if (counts[k] == max) {
  //         results.push(parseInt(k));
  //       }
  //     }
  //     //console.log(results);
  //     newarray = results
  //   }
  //   box(arraycopy)
  //   arraycopy.forEach((obj, index) => {
  //     //console.log(obj)
  //     var key = Object.keys(obj)[0]
  //     if (newarray.indexOf(obj[key].id) === -1) {
  //
  //       if (first.length > 0) {
  //         if (first.indexOf(key) === -1) {
  //           obj[key].values.splice(0, 2000)
  //         }
  //       }
  //         _that.thumbnails.splice(0, 2000)
  //         if (newarray.length > 0){_that.thumbnailsf(newarray[0] -1);
  //          }
  //         else{_that.thumbnailsf(0)}
  //     }
  //   })
  //   var arrayUnd = _that.arrayUnd
  //   this.repeat(arrayUnd, arraycopy)
  //
  //   _that.arrayOfKeys.forEach((key) => {
  //     var val = checkvalues[key]
  //     _that.formgroups.controls[key].setValue(val)
  //   })
  // }
  }



  ngOnInit() {
    this.formgroups=this.fb.group({})

        var productId = this.activatedRoute.snapshot.params.productid;
        this.productId = productId;


        let _that = this;
        _that.dataservice.getJSON().subscribe((data: any) => {
          console.log(data)
        // var data = _that.getData.getJSON()
    if (data['PRODUCTS'].length >= 1){
          data['PRODUCTS'].forEach((product: any) => {

            if (product['PRODUCTID'] == productId) {
              this.ProductObj=product
              console.log(this.ProductObj)
              console.log(this.ProductObj["VARIENTS"].length)
              this.VARIENTLENGTH=this.ProductObj["VARIENTS"].length
                // if (product.MultiProductInfo){
                //   _that.ProductObj.MultiProductInfo = product.MultiProductInfo
                // }
              _that.thumbnailsf(0)

              if (this.ProductObj['VARIENTS'].length >= 1){
              this.ProductObj['VARIENTS'].forEach((v) => {
                if ( v['VARIENTINFO']['INVENTORY'] > 1){
                  console.log(v)
                  if (v["OPTIONS"]){
                    v["OPTIONS"].forEach((o) => {
                      console.log(o)
                      _that.arrayofoptions.push(o)
                })
              }
    }
              })

              var arrayofoptions = JSON.parse(JSON.stringify(_that.arrayofoptions));
              var arrayUnd = JSON.parse(JSON.stringify(_that.arrayUnd));
              _that.repeat(arrayUnd, arrayofoptions)
              console.log(_that.arrayOfKeys)
    }
            }

          });

        }
      this.makeformGroups()
      Object.keys(this.OPTIONSARRAY).forEach((k)=>{
            this.formgroups.addControl(k, this.fb.control('', Validators.required))
      })
      this.thumbnails.push(this.ProductObj['VARIENTS'][0]['VARIENTINFO']['MAINIMAGE'])
      this.onspecProduct['IMAGEPAIR'].forEach(image=>{this.thumbnails.push(image['ADDIMAGE'])})
      console.log(this.thumbnails)

        });
  }





}
