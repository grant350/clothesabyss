import { Injectable } from '@angular/core';
import { Router, CanActivate , ActivatedRoute,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {ServerService} from './server.service';
import { HttpClient , HttpHeaders,HttpClientModule} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
private role:any;

    constructor(public service: ServerService, public router: Router, private http: HttpClient) {
    }
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          this.role = localStorage.getItem("permissions")
          console.log(this.role)
           if (this.role !== 'admin' ) {
             this.router.navigate(['/pages/login']);
             return false;
           }else{
             return true;

           }
         }
}

export class RoleUser implements CanActivate {
private role:any;
    constructor(public service: ServerService, public router: Router, private http: HttpClient) {
    }
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          this.role = localStorage.getItem("permissions")
          console.log(this.role)
           if (this.role === 'user' || this.role === "admin") {
             console.log("success role")
             return true;
           }else{
             console.log("sucfailed role")
             this.router.navigate(['/pages/login']);
             return false;

           }
         }
}
