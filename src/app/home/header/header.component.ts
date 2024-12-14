import { Component } from '@angular/core';
import { LoginComponent } from "../../login/login.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent,CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
Title : string = 'IT Scholar';

showLoginModal = false;

  constructor(private router: Router) {}

  openLoginModal() {
    this.showLoginModal = true;
    document.body.classList.add('modal-open'); // Lock the scroll
  }

  closeLoginModal() {
    this.showLoginModal = false;
    document.body.classList.remove('modal-open'); // Unlock the scroll
  }

  onAuthenticated(role: string) {
    this.showLoginModal = false;
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'student') {
      this.router.navigate(['/student-dashboard']);
    }
  }
}

