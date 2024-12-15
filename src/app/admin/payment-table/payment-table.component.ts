import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../../services/student.service';
import { Pipes } from '../../pipes/search-filter.pipe';
import { MatSnackBar} from '@angular/material/snack-bar';  
import { Students } from '../../Models/model';
import { PaymentService } from '../../services/payment.service';
import { SearchnicPipe } from '../../pipes/searchnic.pipe';
import { SearchnamePipe } from '../../pipes/searchname.pipe';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxPaginationModule, Pipes,SearchnicPipe,SearchnamePipe],
  templateUrl: './payment-table.component.html',
  styleUrl: './payment-table.component.css'
})
export class PaymentTableComponent implements OnInit,OnChanges{
studentForm!: FormGroup; // Declare the studentForm
  isEditMode = false; // Default to "Add Student" mode
  selectedStudent: any = null; // Store student data for edit mode

  searchText: string = '';
  searchNic: string = '';
  stud: Student[] = []; // All students data
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 7; // Number of items per page
  paginatedStudents: Students[] = []; // Paginated students
  totalItems: number = 0; // Total number of students
  isLoading: boolean = true; // To show loading indicator
  errorMessage: string = ''; // For error handling
  studentpayment:studentpayment[]=[]
 

  constructor(
    private StudentService: StudentService,
    private fb: FormBuilder,private snackBar: MatSnackBar,private paymentservice:PaymentService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
  this.fetchpayments()
  }

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchpayments()
    // this.initializeForm();
  }

  // Fetch students from the backend
  fetchStudents() {
    this.StudentService.getStudents().subscribe({
      next: (data) => {
        this.stud = data; // Store all students
        this.isLoading = false;
        console.log(this.stud)
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students. Please try again later.';
        console.error('Error loading students:', error);
  
        // Use MatSnackBar for error notification
        this.snackBar.open('Failed to load students. Please try again later.', 'Close', {
          duration: 3000, // Duration in milliseconds
          horizontalPosition: 'right', // Horizontal alignment
          verticalPosition: 'top', // Vertical alignment
          panelClass: ['error-snackbar'], // Custom class for error styling
        });
  
        this.isLoading = false;
      },
    });
  }


  fetchpayments(){
    this.paymentservice.getPaymentDetails().subscribe(data=>{
      this.studentpayment=data
      console.log("payment",this.studentpayment)
    })
  }
  

  
  get totalPages(): number {
    return Math.ceil(this.stud.length / this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Delete a student
  deleteStudent(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.StudentService.deleteStudent(id).subscribe({
        next: () => {
          // Show success notification
          this.snackBar.open('Student deleted successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'right', // Horizontal alignment
            verticalPosition: 'top', // Vertical alignment
            panelClass: ['success-snackbar'], // Custom class for success styling
          });
  
          // Refresh the student list
          this.fetchStudents();
        },
        error: (err) => {
          console.error('Error deleting student:', err);
  
          // Show error notification
          this.snackBar.open('Failed to delete the student. Please try again later.', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'right', // Horizontal alignment
            verticalPosition: 'top', // Vertical alignment
            panelClass: ['error-snackbar'], // Custom class for error styling
          });
        },
      });
    }
  }
  
  // Triggered when "Add Student" button is clicked
  onAddStudent() {
    this.isEditMode = false;
    this.selectedStudent = null;
    // this.initializeForm(); // Reset the form for new student registration
  }

  // Triggered when "Edit Student" button is clicked
  onEditStudent(student: any) {
    this.isEditMode = true;
    this.selectedStudent = student;
    this.populateForm(student); // Populate the form with student data
  }

  // Populate form for "Edit Student"
  populateForm(student: any) {
    this.studentForm.patchValue({
      fullName: student.name,
      email: student.email,
      password: '', // Optional: Leave empty or mask
      nicNumber: student.nic,
      roleId: student.id,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      mobileNumber: student.mobileNumber,
      profilePicture: student.profilePicture,
      registrationFee: student.Fee,
      isRegistrationFeePaid: student.isRegistrationFeePaid,
    });
  }
  // Handle form submission
  onSubmit() {
    if (this.studentForm.valid) {
      if (this.isEditMode) {
        // Update student logic
        console.log('Updating student:', this.studentForm.value);
      } else {
        // Add new student logic
        console.log('Adding new student:', this.studentForm.value);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}



export interface studentpayment{
  studentId: number;
  studentName: string;
  totalFee: number;
  totalPaid: number;
  paymentDue: number;
  paymentStatus: string;
  nic: string;
}