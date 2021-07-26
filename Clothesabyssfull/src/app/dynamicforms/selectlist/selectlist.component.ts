import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-selectlist',
  templateUrl: './selectlist.component.html',
  styleUrls: ['./selectlist.component.scss']
})
export class SelectlistComponent implements OnInit {
  @Input() data: any;
  @Input() errorsfile: any;
  @Input() control: any;
  @Input() auth: any;
  constructor() { }

  ngOnInit() {
  }

}
