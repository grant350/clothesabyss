import { Injectable, Input} from '@angular/core';
import {NavigationEnd, Router, Resolve, ActivatedRoute, RouterEvent, UrlSegment, RouterState, RouterStateSnapshot, } from '@angular/router';
import { Observable, of } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from 'rxjs/Subject';
import { filter,map } from 'rxjs/operators';
import { Location } from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import { DataService } from './products.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PageHandleService {
// made as garbage rn
  @Input() pagecatagory: any;
  public data: any;

  public arrayCat: any = [];
  public arrayText: any = [];
  public arrayCollection: any = [];


   constructor( private http: HttpClient, private dataservice: DataService, private router: Router){



         this.dataservice.getJSON2().subscribe((data: any) => {
           var path = "../../assets/productCatagories"
           this.data = data
           var catagory = this.pagecatagory
           let xer= data.images[0].catagories[0][`${catagory}`][0]
           if (xer.image){
           var x = data.images[0].catagories[0][`${catagory}`][0].image
           var z = data.images[0].catagories[0][`${catagory}`][1].text
           var y = data.images[0].catagories[0][`${catagory}`][2].collection
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

         })

};



}
