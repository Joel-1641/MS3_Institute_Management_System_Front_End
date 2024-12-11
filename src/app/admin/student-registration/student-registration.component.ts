import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { StudentService } from '../../services/student.service';

declare const bootstrap: any; 

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    // Initialize form
    this.studentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nicNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{9}[VvXx]$/)],
      ],
      roleId: [2], // Default role ID
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{8}$/)],
      ],
      profilePicture: [''],
      registrationFee: [0, Validators.required], // Decimal
      isRegistrationFeePaid: [false, Validators.required], // Boolean
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;

      console.log('Form Data:', formData);

      this.studentService.addStudent(formData).subscribe({
        next: (response) => {
          console.log('Student registered successfully:', response);
          alert('Student registered successfully!');
          this.studentForm.reset(); // Clear the form
        },
        error: (err) => {
          console.error('Error registering student:', err.error);
          alert(err.error.message || 'An error occurred while registering the student.');
        },
      });
    } else {
      console.log('Form is invalid:', this.studentForm); // Debug log
      this.studentForm.markAllAsTouched(); // Mark all fields as touched for validation
    }
  }
}