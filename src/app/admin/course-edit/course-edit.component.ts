import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';  
import * as bootstrap from 'bootstrap';
import axios from 'axios';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css',
})
export class CourseEditComponent implements OnInit {
  @ViewChild('addCourseModal') addCourseModal!: ElementRef;
  courseForm: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false;
  courseId: number | null = null;
  modalInstance: bootstrap.Modal | null = null;
  fileInputError: string = '';
  modalVisible: boolean = false; // Control modal visibility

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      level: ['', Validators.required], // Ensure level is required
      courseType: ['', Validators.required],  // Ensure courseType is required
      courseFee: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      courseImg: [''], // Optional field
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // Check if editing a course
      this.route.queryParams.subscribe((queryParams) => {
        const isAdding = queryParams['addCourse'] === 'true';

        if (id) {
          this.isEditMode = true;
          this.courseId = +id;
          this.loadCourseDetails(this.courseId);
          this.showModal(); // Show modal for editing
        } else if (isAdding) {
          this.isEditMode = false;
          this.courseForm.reset(); // Reset form for adding a course
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

  // Fetch course details and prefill the form
  private loadCourseDetails(id: number): void {
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.courseForm.patchValue(course); // Populate form with course details
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
  
        // Snackbar for error notification
        this.snackBar.open('Failed to load course details. Please try again.', 'Close', {
          duration: 3000, // Duration in milliseconds
          horizontalPosition: 'right', // Position on the horizontal axis
          verticalPosition: 'top', // Position on the vertical axis
          panelClass: ['error-snackbar'], // Custom class for error styling
        });
      },
    });
  }
  

  private showModal(): void {
    if (this.addCourseModal) {
      const modalElement = this.addCourseModal.nativeElement;
      if (!this.modalInstance) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      this.modalInstance.show();
    }
  }

  onClose() {
    this.modalVisible = false;
    this.modalInstance?.hide();
    this.router.navigate(['/admin/courses']);
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

  // closeModal() {
  //   const modalElement = document.getElementById('staticBackdrop');
  //   const modal = bootstrap.Modal.getInstance(modalElement!); // Get existing modal instance
  //   modal.hide(); // Hide the modal
  // }
  
  private closeModal(shouldNavigate: boolean = true): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
    if (shouldNavigate) {
      this.router.navigate(['/admin/courses']);
    }
  }
 

  onSubmit(): void {
    const courseData = this.courseForm.value;

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

          // Add the image URL to courseData
          courseData.courseImg = imageUrl;
          //console.log(imageUrl);
          // Proceed to save the course data
          this.saveCourse(courseData);
          //console.log(courseData)
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        
          // Use MatSnackBar for error notification
          this.snackBar.open('Failed to upload the image. Please try again.', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'right', // Horizontal alignment
            verticalPosition: 'top', // Vertical alignment
            panelClass: ['error-snackbar'], // Custom class for error styling
          });
        });
        
    } else {
      // If no image is selected, proceed with existing data
      this.saveCourse(courseData);
      this.router.navigate(['/admin/courses']);
    }
  }

  // Separate method to handle saving the course
  private saveCourse(courseData: any): void {
    if (this.isEditMode) {
      this.courseService.updateCourse(this.courseId!, courseData).subscribe({
        next: () => {
          // Success snackbar for course update
          this.snackBar.open('Course updated successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'right', // Position on the horizontal axis
            verticalPosition: 'top', // Position on the vertical axis
            panelClass: ['custom-snackbar'], // Custom class for success styling
          });
  
          this.closeModal(); // Close the modal after update
          this.router.navigate(['/admin/courses']);
        },
        error: (err) => {
          console.error('Error updating course:', err);
          
          // Error snackbar for course update failure
          this.snackBar.open('Failed to update the course. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'], // Custom class for error styling
          });
        },
      });
    } else {
      this.courseService.addCourse(courseData).subscribe({
        next: () => {
          // Success snackbar for adding course
          this.snackBar.open('Course added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar'], // Custom class for success styling
          });
  
          this.closeModal(); // Close the modal after adding
          this.router.navigate(['/admin/courses']);
        },
        error: (err) => {
          console.error('Error adding course:', err);
  
          // Error snackbar for adding course failure
          this.snackBar.open('Failed to add the course. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'], // Custom class for error styling
          });
        },
      });
    }
  }
  
  // private saveCourse(courseData: any): void {
  //   if (this.isEditMode) {
  //     this.courseService.updateCourse(this.courseId!, courseData).subscribe({
  //       next: () => {
  //         alert('Course updated successfully!');
  //         this.closeModal(); // Close the modal after update
  //         this.router.navigate(['/courses']);
  //       },
  //       error: (err) => console.error('Error updating course:', err),
  //     });
  //   } else {
  //     this.courseService.addCourse(courseData).subscribe({
  //       next: () => {
  //         alert('Course added successfully!');
  //         this.closeModal(); // Close the modal after add
  //         this.router.navigate(['/courses']);
  //       },
  //       error: (err) => console.error('Error adding course:', err),
      
  //     });
  //   }
  // }

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

  // without image Submit form
  // onSubmit(): void {
  //   const courseData = this.courseForm.value;
  //   if (this.isEditMode) {
  //     this.courseService.updateCourse(this.courseId!, courseData).subscribe({
  //       next: () => {
  //         alert('Course updated successfully!');
  //         this.closeModal(); // Close the modal after update
  //         this.router.navigate(['/courses']);
  //       },
  //       error: (err) => console.error('Error updating course:', err),
  //     });
  //   } else {
  //     this.courseService.addCourse(courseData).subscribe({
  //       next: () => {
  //         alert('Course added successfully!');
  //         this.closeModal(); // Close the modal after add
  //         this.router.navigate(['/courses']);
  //       },
  //       error: (err) => console.error('Error adding course:', err),
  //     });
  //   }
  // }

 
  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // async onSubmit(): Promise<void> {
  //   if (this.courseForm.valid) {
  //     const formData = this.courseForm.value;

  // Upload the image if selected
  // if (this.selectedFile) {
  //   try {
  //     const imageUrl = await this.uploadToCloudinary(this.selectedFile);
  //     formData.courseImg = imageUrl; // Set the image URL
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     return; // Stop further execution if upload fails
  //   }
  // }

  // Call the service to save the course
  //     this.courseService.addCourse(formData).subscribe({
  //       next: () => {
  //         alert('Course added successfully!');
  //         this.courseForm.reset();
  //       },
  //       error: (err) => {
  //         console.error('Error adding course:', err);
  //       },
  //     });
  //   } else {
  //     this.courseForm.markAllAsTouched();
  //   }
  // }

  // //Upload image to Cloudinary
  //   private async uploadToCloudinary(file: File): Promise<string> {
  //     const url = `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`;
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your Cloudinary preset

  //     const response = await fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image');
  //     }

  //     const data = await response.json();
  //     return data.secure_url; // Return the uploaded image URL
  //   }
}
