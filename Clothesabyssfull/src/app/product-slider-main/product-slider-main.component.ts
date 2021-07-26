import { Component, AfterContentInit, OnInit, Input } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DataService } from '../products.service';
import { Observable } from "rxjs";
import { CartService } from '../cartservice.service';
import { pipe } from 'rxjs';



@Component({
  selector: 'app-product-slider-main',
  templateUrl: './product-slider-main.component.html',
  styleUrls: ['./product-slider-main.component.scss', '../productcard/productcard.component.scss']
})


export class ProductSliderMainComponent implements OnInit {
  @Input() type: any;
  public data: any;
  public array = [];
  public productArray;
  public product:any;
  constructor(private dataservice: DataService, private cartservice: CartService) {
  }

  ngOnInit() {
    //{"type":value,"func":random,catagory,specific}
    if (this.type) {
      this.cartservice.types(this.type).then( (data:any)=>{this.array=data})

    }
    //console.log(a)

    let el2 = document.createElement('script');
    let el = document.createElement('script');
    el.setAttribute('src', '../../assets/flickity-resize.js');
    document.body.appendChild(el);
    el2.setAttribute('src', '../../assets/flickity.js');
    document.body.appendChild(el2);
  }



}
