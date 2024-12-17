import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  FormsModule,
  CommonModule,
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
  errorMessage: string = '';

  // const adminCredentials = { email: 'admin@example.com', password: 'admin123' };
  // studentCredentials = { email: 'michaelb@example.com', password: 'student123' };

  constructor(private authService: AuthService, private renderer: Renderer2,private router:Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'modal-open'); // Lock background
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-open'); // Unlock background
  }

  closeModal() {
    this.close.emit();
  }

// Handle form submission
onSubmit(): void {
  const adminCredentials = { email: 'admin@example.com', password: 'admin123' };

  // Check if email and password are provided
  if (this.email && this.password) {

    // If the user enters admin credentials, manually check the hardcoded values
    if (this.email === adminCredentials.email && this.password === adminCredentials.password) {
      // Navigate to the admin dashboard if the credentials are correct
      this.router.navigate(['/admin']);
    } else {
      // For user login, call the login service to authenticate the user
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          const token = response.token;  // Assuming response contains the token
          this.authService.saveToken(token);  // Save the token in localStorage

          const userId = this.authService.getUserId();  // Extract userId from the token
          
          // If userId is found, navigate to their student dashboard
          if (userId) {
            this.router.navigate([`/student-dashboard/${userId}`]);
          } else {
            this.errorMessage = 'Failed to retrieve user data.';
          }
        },
        error: () => {
          this.errorMessage = 'Invalid email or password.';
        },
      });
    }
  } else {
    this.errorMessage = 'Please enter email and password.';
  }
}




  //without token
  // onSubmit() {
  //   if (
  //     this.email === this.adminCredentials.email &&
  //     this.password === this.adminCredentials.password
  //   ) {
  //     this.authenticated.emit('admin');
  //   } else if (
  //     this.email === this.studentCredentials.email &&
  //     this.password === this.studentCredentials.password
      
  //   ) {
  //     console.log(this.email);
  //     console.log(this.password);

  //     // Navigate to student dashboard
  //     this.router.navigate(['/student-dashboard']);
  //     console.log('welcom dash board')
  //   } else {
  //     this.snackBar.open('Invalid credentials', 'Close', {
  //       duration: 3000,  // SnackBar will disappear after 3 seconds
  //       verticalPosition: 'top', // optional, you can position the snackbar vertically
  //       horizontalPosition: 'center' // optional, you can position it horizontally
  //     });
  // }
  // }
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
