// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.authService.getToken();

  //   // Clone the request to add the Authorization header with the token
  //   const authReq = token ? req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }) : req;

  //   return next.handle(authReq);
  // }
}
