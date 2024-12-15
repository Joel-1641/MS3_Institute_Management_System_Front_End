import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { StudentService } from '../../services/student.service';
import { Pipes } from '../../pipes/search-filter.pipe';
import { MatSnackBar} from '@angular/material/snack-bar';  

@Component({
  selector: 'app-payment-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,Pipes],
  templateUrl: './payment-portal.component.html',
  styleUrl: './payment-portal.component.css'
})
export class PaymentPortalComponent {
  @ViewChild('addStudentModal') addStudentModal!: ElementRef;
  paymentForm: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false;
  studentId: number | null = null;
  modalInstance: bootstrap.Modal | null = null;
  fileInputError: string = '';
  modalVisible: boolean = false; // Control modal visibility

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,private snackBar: MatSnackBar
  ) {
    // Form Initialization
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$')
        ]
      ],
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
      profilePicture: [''], // Optional
      registrationFee: [null, Validators.required], // Ensure non-zero numeric value
      isRegistrationFeePaid: [true, Validators.requiredTrue], // Must be checked
    });
  }

  ngOnInit(): void {
    const prefilledData = { dateOfBirth: "yyyy-mm-T00:00:00Z" }; // Example backend data
    const formattedDate = new Date(prefilledData.dateOfBirth).toISOString().split('T')[0];
    this.paymentForm.patchValue({ dateOfBirth: formattedDate });


    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // Check if editing a student
      this.route.queryParams.subscribe((queryParams) => {
        const isAdding = queryParams['addStudent'] === 'true';

        if (id) {
          this.isEditMode = true;
          this.studentId = +id;
          this.loadStudentDetails(this.studentId);
          this.showModal(); // Show modal for editing
        } else if (isAdding) {
          this.isEditMode = false;
          this.paymentForm.reset(); // Reset form for adding a student
          this.showModal(); // Show modal for adding
        }
      });
    });
  }

  // Ensure the modal is shown only after the view is initialized
  ngAfterViewInit(): void {
    // Delay modal initialization to ensure it is in the DOM
    setTimeout(() => this.showModal(), 0);
  }

  // Fetch student details and prefill the form
  private loadStudentDetails(id: number): void {
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.paymentForm.patchValue(student); // Populate form with student details
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
      },
    });
  }

  private showModal(): void {
    if (this.addStudentModal) {
      const modalElement = this.addStudentModal.nativeElement;
      if (!this.modalInstance) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      this.modalInstance.show();
    }
  }

  onClose() {
    this.modalVisible = false;
    this.modalInstance?.hide();
    this.router.navigate(['/students']);
  }
  onBackdropClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Prevent modal from closing when clicked inside
  onModalClick(event: MouseEvent) {
    event.stopPropagation(); // Stop event propagation to backdrop
  }

  // Open modal method (you can use it to toggle visibility)
  openModal() {
    const modalElement = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(modalElement!); // Create a modal instance
    modal.show(); // Show the modal
  }

  private closeModal(shouldNavigate: boolean = true): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
    if (shouldNavigate) {
      this.router.navigate(['/students']);
    }
  }

  onSubmit(): void {
    const studentData = this.paymentForm.value;

    if (this.selectedFile) {
      // If an image file is selected, upload it to Cloudinary first
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'IT_Scholar_Student'); // Replace with your preset
      formData.append('folder', 'IT_Scholar_Student'); // Replace with your folder name

      // Upload image to Cloudinary
      axios
      .post(
        'https://api.cloudinary.com/v1_1/itscholar/image/upload ',
        formData
        )
        .then((cloudinaryResponse) => {
          // Get the uploaded image URL
          const imgUrl = cloudinaryResponse.data.secure_url;

          // Add the image URL to studentData
          studentData.profilePicture = imgUrl;
          console.log(imgUrl);
          // Proceed to save the student data
          this.saveStudent(studentData);
          console.log(studentData);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload the image. Please try again.');
        });
    } else {
      // If no image is selected, proceed with existing data
      this.saveStudent(studentData);
      this.router.navigate(['/admin/students']);
    }
  }

  // Separate method to handle saving the student
  private saveStudent(studentData: any): void {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.studentId!, studentData).subscribe({
        next: () => {
          // Show success notification
          this.snackBar.open('Student updated successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'right', // Horizontal alignment
            verticalPosition: 'top', // Vertical alignment
            panelClass: ['success-snackbar'], // Custom class for success styling
          });
          this.closeModal(); // Close the modal after update
          this.router.navigate(['/students']); // Navigate to the student list
        },
        error: (err) => {
          console.error('Error updating student:', err);
  
          // Show error notification
          this.snackBar.open('Failed to update student. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'], // Custom class for error styling
          });
        },
      });
    } else {
      this.studentService.addStudent(studentData).subscribe({
        next: () => {
          // Show success notification
          this.snackBar.open('Student added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.closeModal(); // Close the modal after add
          this.router.navigate(['/students']); // Navigate to the student list
        },
        error: (err) => {
          console.error('Error adding student:', err);
  
          // Show error notification
          this.snackBar.open('Failed to add student. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
  

  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (only .jpg and .png are allowed)
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB size limit

      if (!allowedTypes.includes(file.type)) {
        this.fileInputError = 'Only .jpg and .png image files are allowed.';
        this.selectedFile = null; // Clear the selected file
        return;
      }

      // Validate file size (limit to 5MB)
      if (file.size > maxSize) {
        this.fileInputError = 'File size should not exceed 5MB.';
        this.selectedFile = null; // Clear the selected file
        return;
      }

      // If file is valid
      this.fileInputError = ''; // Clear any previous error
      this.selectedFile = file;
    }
  }

  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected: ", file);  // Check if file is selected
      this.selectedFile = file;
    }
  }
}
