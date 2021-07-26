import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-image-catagory-ct',
  templateUrl: './image-catagory-ct.component.html',
  styleUrls: ['./image-catagory-ct.component.scss']
})
export class ImageCatagoryCtComponent implements OnInit {
  @Input()  imageclass: any;
  @Input() page: any;
  @Input() active: any;
  public bannerT="true"
  public bannerF="false"



  constructor() { }

  ngOnInit() {
  }

}
