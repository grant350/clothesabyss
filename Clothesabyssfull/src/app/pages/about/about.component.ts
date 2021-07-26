import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
public width="100%"
public height="600px"
public aboutimg="aboutimg"
 public active="false"

  constructor() { }

  ngOnInit() {
  }

}
