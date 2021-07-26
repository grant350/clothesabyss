import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../server.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
public userdata:any;
  constructor(public serverservice:ServerService) {
  }

  ngOnInit() {
  }

}
