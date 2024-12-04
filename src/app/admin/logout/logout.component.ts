import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    private router: Router,
    // private authService: AuthenticationService
  ) {}

  logout(): void {
    // Remove the token from localStorage
    //this.authService.removeToken();

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
