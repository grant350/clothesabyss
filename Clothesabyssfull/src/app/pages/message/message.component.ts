import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common/'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
private messageOption:any;
public message: String;
  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let messageOption = this.activatedRoute.snapshot.params.message

    if (messageOption === 'email_verified'){
         this.message = "Your Email Has Been Verified. you can now see your changes in the Accounts Page "
    }

    if (messageOption === 'password_changed'){
         this.message = "Your Password Has Been Changed. you can now Login in with your new password!"
    }

  }





}
