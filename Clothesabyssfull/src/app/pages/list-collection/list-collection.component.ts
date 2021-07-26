
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../../products.service';
import { Observable } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common/'

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.scss']
})
export class ListCollectionComponent implements OnInit {

  @Input() pagecatagory: any;
  public data: any;
  public arrayCat: any = [];
  public arrayText: any = [];
  public arrayCollection: any = [];

  constructor(private activatedRoute: ActivatedRoute, private dataservice: DataService, private router: Router, private location: Location, private http: HttpClient) {


}


  ngOnInit() {

    this.dataservice.getJSON2().subscribe((data: any) => {
      var path = "../../assets/productCatagories"
      this.data = data
      var catagory = this.pagecatagory
console.log(data.images[0].catagories[`${catagory}`][0])
console.log(data.images[0].catagories[`${catagory}`][0])

      if ( data.images[0].catagories[`${catagory}`][0].image ){
      var x = data.images[0].catagories[`${catagory}`][0].image
      var z = data.images[0].catagories[`${catagory}`][1].text
      var y = data.images[0].catagories[`${catagory}`][2].collection
      let newx = x.length
      let newz = z.length
      let newy = y.length
      for (let i = 0; i < newx; i++) {
        var item = x[i]
        item = path + item
        this.arrayCat.push(item)
      }
      for (let i = 0; i < newz; i++) {
        let item = z[i]
        this.arrayText.push(item)
      }
      for (let i = 0; i < newy; i++) {
        let item = y[i]
        this.arrayCollection.push(item)
      }
    }
    //end
    })
  }







}
