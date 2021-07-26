import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable, of } from "rxjs";
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { Location } from '@angular/common/'
import { DataService } from './products.service';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
@Injectable({ providedIn: "root" })

export class GlobalFormService {

  constructor(private http: HttpClient, public router: Router, private activatedRoute: ActivatedRoute,private location:Location) {}


  getParamIndex(name){
    var that = this
    var paramsz={}
     that.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['selectedValue']) {
        var p = params['selectedValue'].toString()
        var selectedValue = (p)
        var index=params['index']
        paramsz= {
          "params":{"index":index,"selectedValue":selectedValue}
        };

      }else{
        console.log("no selectedvalue in params no data to formbuilder")
      }
      // this.reloadTree()
    })
    if (paramsz){
      return paramsz

    }


  }



}
