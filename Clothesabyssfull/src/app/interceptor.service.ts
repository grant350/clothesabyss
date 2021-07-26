import { HttpInterceptor,HttpRequest,HttpHandler,HttpHeaders } from "@angular/common/http"
import {Injectable} from "@angular/core"
import {ServerService} from "./server.service"


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: ServerService){}

intercept(req: HttpRequest<any>, next: HttpHandler){




  var mainauthtoken = this.service.getCookie('DataToken')
  var mainauthtoken2 = this.service.getCookie('DataToken')
  // var headers = new HttpHeaders({
  //    });
  //    headers.append('Authorization', "Bearer " + mainauthtoken)

// var headers={};
// req.headers.append('Authorization', "Bearer " + mainauthtoken)

  const authRequest  = req.clone({headers:  req.headers.set('Authorization', "Bearer " + mainauthtoken2)})

    return next.handle(authRequest)
}
}


//can only use this globaly for the server the rest of the api tokens have to be sent seperatly;

// @Injectable()
// export class EmailAuthInterceptor implements HttpInterceptor {
//
//   constructor(private service: ServerService){}
// intercept(req: HttpRequest<any>, next: HttpHandler){
//   var emailauthtoken = localStorage.getItem('routehash')
//
// //get cookie
//   const authRequest  = req.clone({headers: req.headers.set('Authorization', "Bearer " + emailauthtoken)})
//
//     return next.handle(authRequest)
//
// }
//
// }
