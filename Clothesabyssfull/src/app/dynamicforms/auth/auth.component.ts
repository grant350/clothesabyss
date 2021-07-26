import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Input() data: any;
  @Input() errorsfile: any;
  @Input() control: any;
  @Input() auth: any;

  constructor() { }

  ngOnInit() {

  //console.log(errors)
    console.log(this.data);
    console.log(this.control);
    console.log(this.errorsfile);

  }

}
