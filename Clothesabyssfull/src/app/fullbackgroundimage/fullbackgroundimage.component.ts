import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-fullbackgroundimage',
  templateUrl: './fullbackgroundimage.component.html',
  styleUrls: ['./fullbackgroundimage.component.scss']
})
export class FullbackgroundimageComponent implements OnInit {
  @Input() backgroundimage: any;
  constructor() { }

  ngOnInit() {
    console.log(this.backgroundimage)

  }
  stylesbackground(){
    var classes = this.backgroundimage
  return classes
  }
}
