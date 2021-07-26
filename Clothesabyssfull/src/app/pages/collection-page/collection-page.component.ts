

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../../products.service';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common/'

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})

export class CollectionPageComponent implements OnInit {
  @Input() collectionName: any;
  @Input() itemsPerPage: number;
  public data: any;
  public array2 = [];
  public currentPage = 1;
  public length: any;
  public pages: any;
  public newArray = [];
  public productCatagory;
  public product:any;
  constructor(private dataservice: DataService, private router: Router, private location: Location, private activatedRoute: ActivatedRoute) {
  var productCatagory = this.productCatagory
  let productcat = this.activatedRoute.snapshot.params.productcat
  console.log(productcat)
  console.log(productcat)
  console.log(productcat)
  console.log(productcat)

    this.productCatagory = productcat
    console.log(productcat)
  var array2 = this.array2
    this.dataservice.getJSON().subscribe((data: any) => {
      try {
        this.length = data.length;
      }catch{
        console.log("ERROR NO PRODUCTS")
      }
    if (data.length >=1 && data){
      if (data.length >=1){
        data.forEach((product, index)=> {
          if ( product.productCatagory === productcat) {
            array2.push(product)
          }
          else{
            console.log("not in array")
          }
        })
      }

    }



      this.length = this.array2.length
      this.pages = Math.round(this.length / this.itemsPerPage)
      this.newArray = this.array2.slice((this.currentPage - 1), this.itemsPerPage)
      console.log(this.newArray)

    })

  }



  public Click(click) {
    console.log(click.toLowerCase())
    var click = click.toLowerCase()


    if (click == "left") {

      if (this.currentPage != 1 && this.currentPage >= 1) {
        var start = (((this.currentPage -= 1) * this.itemsPerPage) - this.itemsPerPage);
        var end = (this.currentPage) * this.itemsPerPage;
        this.newArray = this.array2.slice(start, end)
      }
    }
    else if (click == "right") {
      if (this.currentPage < this.pages) {
        var start = (((this.currentPage += 1) * this.itemsPerPage) - this.itemsPerPage);
        var end = (this.currentPage) * this.itemsPerPage;
        console.log(start)
        console.log(end)

        this.newArray = this.array2.slice(start, end)
      }
    }
    console.log(this.currentPage)
    console.log(this.newArray)
  }






  ngOnInit() {
  }






}
