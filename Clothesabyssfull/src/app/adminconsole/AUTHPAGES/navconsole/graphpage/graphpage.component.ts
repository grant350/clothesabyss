import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-graphpage',
  templateUrl: './graphpage.component.html',
  styleUrls: ['./graphpage.component.scss']
})
export class GraphpageComponent implements OnInit {

  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.viewclicked('retrievegraph')

  }
  viewclicked(viewname) {
    // this.view.viewdata = userdataparsed
    if (viewname) {
      if (viewname === "retrievegraph") {
        this.router.navigate(['retrievegraph'],{relativeTo:this.activatedRoute})
      }
      if (viewname === "makegraph") {
        this.router.navigate(['makegraph'],{relativeTo:this.activatedRoute})
      }

    }

  }


}
