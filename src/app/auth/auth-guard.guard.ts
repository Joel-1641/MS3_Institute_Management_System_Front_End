import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupSigninService } from '../services/signup-signin.service';

@Injectable({
  providedIn: 'root',
})
// export class AuthGuard implements CanActivate {
//   constructor(
//     private authService: AuthenticationService,
//     private router: Router
//   ) {}

//   canActivate(): Observable<boolean> | Promise<boolean> | boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);  // Redirect to login if not authenticated
//       return false;
//     }
//   }
export class AuthGuard implements CanActivate {
  constructor(private signinService: SignupSigninService, private router: Router) {}
  canActivate(): boolean {
    if (this.signinService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
