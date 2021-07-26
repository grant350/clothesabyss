import { Component, OnInit ,Input} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-img',
  templateUrl: './img-sizer-item.component.html',
  styleUrls: ['./img-sizer-item.component.scss'],

})
export class ImgSizerItemComponent implements OnInit {

@Input()  imageclass: any;
@Input() width: any;
@Input() height: any;
@Input() page: any;
@Input() active: any;
@Input() text: string;
@Input() box: boolean;
@Input() banner: boolean;
public bannerT="true"
public bannerF="false"
  constructor() { }





stylesbind(){
  let stylesbind = { 'width':this.width , 'height':this.height };
return stylesbind
}


   getImgClass(){
    let classes = [ this.imageclass , 'image-changed', 'switch-image' ];
    return classes;
  };

  ngOnInit() {

  }




}
