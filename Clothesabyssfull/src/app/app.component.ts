import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery'
import { Router,ActivatedRoute, NavigationEnd} from '@angular/router';
import {ServerService} from './server.service';
import { FormSubmitting } from './formsubmiting.service';

import * as rawjson from './errorsmodule.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']


})
export class AppComponent implements OnInit{
  title = 'Clothesabyss-app';


constructor(private router:Router,private ss:ServerService, private fs:FormSubmitting){
  this.ss.init()

}

  ngOnInit(){
    this.ss.init()
    console.log("checking auth")
    console.log(rawjson)
}


}
