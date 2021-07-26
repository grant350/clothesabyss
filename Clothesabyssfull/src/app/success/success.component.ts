import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

token:any;
payid:any;

  constructor(private route:ActivatedRoute,private router:Router,private http: HttpClient) { }

  ngOnInit() {
    var that = this

     this.route.queryParams.subscribe(params => {

       this.token = params['token'];
       this.payid = params['PayerID'];
       console.log(this.token)
       var token = this.token
       var payerid = this.payid
       console.log(this.payid)
       let obx = {"payerInfo":{"token":this.token,"payerId":payerid}}
       if (payerid){
       that.http.post('http://localhost:4201/paypalDone',obx).subscribe((res) => {
            console.log(res)
          })
        }
})







}

}
