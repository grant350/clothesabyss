import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminHomeComponent implements OnInit {
  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.viewclicked('console')
  }


  viewclicked(viewname) {
    // this.view.viewdata = userdataparsed
    if (viewname) {
      if (viewname === "console") {
        this.router.navigate(['console'],{relativeTo:this.activatedRoute})
      }
      if (viewname === "productpage") {
        this.router.navigate(['productpage'],{relativeTo:this.activatedRoute})
      }
      if (viewname === "SalesData") {
        this.router.navigate(['SalesData'],{relativeTo:this.activatedRoute})
      }
      if (viewname === "PickData") {
        this.router.navigate(['PickData'],{relativeTo:this.activatedRoute})
      }
      if (viewname === "GRAPHINGPAGE") {
        this.router.navigate(['GRAPHINGPAGE'],{relativeTo:this.activatedRoute})
      }

    }

  }

}
