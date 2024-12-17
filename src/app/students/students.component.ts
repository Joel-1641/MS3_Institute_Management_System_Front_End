import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../services/student.service';
import { HeaderComponent } from "../students/header/header.component";
import { DashboardComponent } from "../students/dashboard/dashboard.component";
import { StudentCourseComponent } from './student-course/student-course.component';
import { CoursesComponent } from "../home/courses/courses.component";
import { FooterComponent } from "../home/footer/footer.component";
import { EventsComponent } from "../home/events/events.component";
import { TeamComponent } from "../home/team/team.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [CommonModule, HeaderComponent, DashboardComponent, StudentCourseComponent, CoursesComponent, FooterComponent, EventsComponent, TeamComponent],
})
export class StudentsComponent implements OnInit {


  userId: number =  Number(localStorage.getItem('UserId')); 
  studentDetails: any;  // Student data object
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService // Assume you have a service to fetch student data
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId')); // Extract userId from URL
    if (this.userId) {
      this.fetchStudentDetails(this.userId);
    }
  }

  // Fetch student details from the backend
  fetchStudentDetails(userId: number): void {
    this.studentService.getStudentById(userId).subscribe({
      next: (data) => {
        this.studentDetails = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Handle error case
      },
    });
  }






//   private studentService = inject(StudentService);
//   students: Student[] = [];
//   userId: number | null = null;
//   studentDetails: any;  // Student data object
//   isLoading = true;
//   errorMessage = '';

//   ngOnInit(): void {
//     this.fetchStudents();
//   }

//   fetchStudents(): void {
//     this.studentService.getStudents().subscribe({
//       next: (data) => {
//         this.students = data;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         this.errorMessage = 'Failed to load students. Please try again later.';
//         this.isLoading = false;
//       }
//     });
//   }
// }

}



