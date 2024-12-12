import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../../services/student.service';
import { SearchStudentPipe  } from '../../pipes/search-course.pipe';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    FormsModule,
    NgxPaginationModule,SearchStudentPipe,
    ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  studentForm!: FormGroup; // Declare the studentForm
  isEditMode = false; // Default to "Add Student" mode
  selectedStudent: any = null; // Store student data for edit mode

  searchText: string = '';
  students: Student[] = []; // All students data
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 3; // Number of items per page
  paginatedStudents: any[] = []; // Paginated students
  totalItems: number = 0; // Total number of students
  isLoading: boolean = true; // To show loading indicator
  errorMessage: string = ''; // For error handling
  totalPages: number = 0; // Total number of pages

  public paginationInstance: PaginationInstance = {
    id: 'students-pagination', // The id used in the pagination control
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage,
  };

  constructor(private StudentService: StudentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchStudents();
    this. initializeForm();
  }

    // Initialize form for both add and edit modes
    initializeForm() {
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
        registrationFee: [0, Validators.required],
        isRegistrationFeePaid: [false, Validators.required],
      });
    }


  // Fetch students from the backend
  fetchStudents() {
    this.StudentService.getStudents().subscribe({
      next: (data) => {
        this.students = data; // Store all students
        this.totalPages = Math.ceil(this.students.length / this.itemsPerPage); // Calculate total pages
        this.updatePaginatedStudents(); // Update the paginated students based on the current page
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students. Please try again later.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  private handleSuccess(students: any[]): void {
    this.students = students;
    this.isLoading = false;
  }

  private handleError(error: any): void {
    this.errorMessage = 'Failed to load students. Please try again later.';
    console.error('Error fetching students:', error);
    this.isLoading = false;
  }

  // Handle page change and update the students for that page
  onPageChange(page: number): void {
    this.currentPage = page;

    // Calculate the start index for the current page
    const startIndex = (page - 1) * this.itemsPerPage;

    // Slice the students array to display the students for the current page
    this.paginatedStudents = this.students.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  // Update the students shown on the current page
  updatePaginatedStudents(): void {
    // Update paginated students based on current page and searchText
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;

    // Filter the students based on the search text
    this.paginatedStudents = this.students
      .filter(
        (student) =>
          student.fullName.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .slice(startIndex, endIndex);
  }

  // Handle previous page click
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedStudents(); // Update the paginated students
    }
  }

  // Handle next page click
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedStudents(); // Update the paginated students
    }
  }


  // Delete a student
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.StudentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Student deleted successfully!');
          this.fetchStudents(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting student:', err);
        },
      });
    }
  }
// Triggered when "Add Student" button is clicked
onAddStudent() {
  this.isEditMode = false;
  this.selectedStudent = null;
  this.initializeForm(); // Reset the form for new student registration
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
    fullName: student.fullName,
    email: student.email,
    password: '', // Optional: Leave empty or mask
    nicNumber: student.nicNumber,
    roleId: student.roleId,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    address: student.address,
    mobileNumber: student.mobileNumber,
    profilePicture: student.profilePicture,
    registrationFee: student.registrationFee,
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
