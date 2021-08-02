 import { Component,Input,OnInit} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {Observable} from "rxjs";


@Component({
  selector: 'app-productcard',
  templateUrl:  './productcard.component.html' ,
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent  implements OnInit {

  constructor(){
  }

  @Input()  product: any;
  @Input()  array: any;
  @Input()  array2: any;
  @Input() index: number;
  @Input() indexs: any;

  //@Input() products: any;
ngOnInit(){
  console.log(this.product)
if (this.product.hasOwnProperty('DATA') || this.product.hasOwnProperty('data')){
  try{this.product=this.product['DATA']
    }catch{
    this.product=this.product['data']
  }
}

}


}
