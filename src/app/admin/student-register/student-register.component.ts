import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css',
})
export class StudentRegisterComponent {
  @ViewChild('addStudentModal') addStudentModal!: ElementRef;
  studentForm: FormGroup;
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
    private router: Router
  ) {
    // Form Initialization
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
      profilePicture: [''], // Optional
      registrationFee: [null, Validators.required], // Ensure non-zero numeric value
      isRegistrationFeePaid: [false, Validators.requiredTrue], // Must be checked
    });
  }

  ngOnInit(): void {
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
          this.studentForm.reset(); // Reset form for adding a student
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
        this.studentForm.patchValue(student); // Populate form with student details
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
    const studentData = this.studentForm.value;

    if (this.selectedFile) {
      // If an image file is selected, upload it to Cloudinary first
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'IT_Scholar'); // Replace with your preset
      formData.append('folder', 'IT_Scholar'); // Replace with your folder name

      // Upload image to Cloudinary
      axios
        .post(
          'https://api.cloudinary.com/v1_1/itscholar/image/upload ',
          formData
        )
        .then((cloudinaryResponse) => {
          // Get the uploaded image URL
          const imageUrl = cloudinaryResponse.data.secure_url;

          // Add the image URL to studentData
          studentData.profilePicture = imageUrl;
          //console.log(imageUrl);
          // Proceed to save the student data
          this.saveStudent(studentData);
          //console.log(studentData)
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload the image. Please try again.');
        });
    } else {
      // If no image is selected, proceed with existing data
      this.saveStudent(studentData);
      this.router.navigate(['/students']);
    }
  }

  // Separate method to handle saving the student
  private saveStudent(studentData: any): void {
    if (this.isEditMode) {
      this.studentService
        .updateStudent(this.studentId!, studentData)
        .subscribe({
          next: () => {
            alert('Student updated successfully!');
            this.closeModal(); // Close the modal after update
            this.router.navigate(['/students']);
          },
          error: (err) => console.error('Error updating student:', err),
        });
    } else {
      this.studentService.addStudent(studentData).subscribe({
        next: () => {
          alert('Student added successfully!');
          this.closeModal(); // Close the modal after add
          this.router.navigate(['/students']);
        },
        error: (err) => console.error('Error adding student:', err),
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
      this.selectedFile = file;
    }
  }
}