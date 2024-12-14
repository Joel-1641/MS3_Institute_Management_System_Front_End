import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() authenticated = new EventEmitter<string>();

  email: string = '';
  password: string = '';

  adminCredentials = { email: 'admin@example.com', password: 'admin123' };
  studentCredentials = { email: 'student@example.com', password: 'student123' };

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'modal-open'); // Lock background
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-open'); // Unlock background
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (
      this.email === this.adminCredentials.email &&
      this.password === this.adminCredentials.password
    ) {
      this.authenticated.emit('admin');
    } else if (
      this.email === this.studentCredentials.email &&
      this.password === this.studentCredentials.password
    ) {
      this.authenticated.emit('student');
    } else {
      alert('Invalid credentials');
    }
  }

  // onLogin() {
  //   if (this.email === 'admin@itscholar.com' && this.password === 'admin123') {
  //     // Navigate to Admin Dashboard
  //     this.router.navigate(['/admin-dashboard']);
  //   } else if (this.email.startsWith('student') && this.password === 'student123') {
  //     // Navigate to Student Dashboard
  //     this.router.navigate(['/student-dashboard']);
  //   } else {
  //     alert('Invalid credentials. Please try again.');
  //   }
  // }

}
