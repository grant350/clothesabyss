import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { GETDATA } from '../../getData.service';
@Component({
  selector: 'app-data-form-edit',
  templateUrl: './data-form-edit.component.html',
  styleUrls: ['./data-form-edit.component.scss']
})
export class DataFormEditComponent implements OnInit {
  @Input() dataArray:any;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private gt:GETDATA) { }

  DELETE(salesindex){
  console.log("send confirmationmessage")
  //confirm confirmation messsage if yes contiue
  var confirmation=null
  var r = confirm("Would you like to Delete this item?");
   if (r == true) {
     this.gt.DeleteDataItem(salesindex)
   } else {
     console.log("canceled delete delete")
   }



  }
  EDIT(salesindex){
  console.log(salesindex)

    console.log("send to addproductpage with data")
    //send index to search product to product add form
    // send productInfo to formbuilder from product addform
    // when it creates form it adds value if fieldname matches
    this.router.navigate(['adminconsole/AUTHPAGES/productpage'],{ queryParams: {sales:salesindex} })
  }

  ngOnInit() {
  }

}
