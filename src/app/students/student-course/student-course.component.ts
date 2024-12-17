import { Component } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService} from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';  

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent {
  student: any = {
    fullName: '',
    mobileNumber: '',
    address: '',
    profilePicture: '',
    nicNumber: '',
    courses: [],
  }; 
  courses: any[] = [];
  selectedCourses: any[] = [];
  nic: string = ''; // Store NIC number
  studentId: number = Number(localStorage.getItem('UserId')); // Dynamically set this value
  isLoading: boolean = false; // Flag for loading state

  constructor(
    private courseService: CourseService, 
    private studentService: StudentService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchStudentData();  // Fetch student data on initialization
    this.getStudentCourses(); // Fetch student courses
  }

  // Fetch student data and extract the NIC number
  fetchStudentData(): void {
    this.isLoading = true;
    this.studentService.getStudentById(this.studentId).subscribe(
      (data) => {
        this.student = data; // Store the student data
        this.nic = data.nicNumber; // Extract the NIC number from the response
        console.log('Student NIC:', this.nic);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching student data:', error);
        this.snackBar.open('Failed to fetch student data', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  // Fetch the available courses
  fetchCourses(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching courses:', error);
        this.snackBar.open('Failed to fetch courses', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  // Add course to the student's course list
  addCourse(course: Course): void {
    if (!this.nic) {
     console.log('NIC is not available');
      return;
    }

    const requestBody = {
      nic: this.nic,  // Use the dynamic NIC number
      courses: [{
        courseName: course.courseName,
        level: course.level
      }]
    };

    this.courseService.addstudentcourse(requestBody).subscribe(
      (data) => {
        console.log('Course successfully added');
        this.getStudentCourses();  // Fetch updated courses after adding
        this.snackBar.open('Course added successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error('Error adding course:', error);
        this.getStudentCourses();
        this.snackBar.open('Course added successfully', 'Close', { duration: 2000 });
      }
    );
  }

  // Remove a course from the student's selected courses
  // removeCourse(courseId: number): void {
  //   this.selectedCourses = this.selectedCourses.filter((course) => course.id !== courseId);
  //   this.snackBar.open('Course removed successfully', 'Close', { duration: 2000 });
  // }

  // Fetch student's current selected courses
  getStudentCourses(): void {
    this.courseService.getstudentcourse(this.studentId).subscribe(
      (data) => {
        this.selectedCourses = data;  // Update selected courses
      },
      (error) => {
        console.error('Error fetching student courses:', error);
        this.snackBar.open('Failed to fetch student courses', 'Close', { duration: 3000 });
      }
    );
  }
}
