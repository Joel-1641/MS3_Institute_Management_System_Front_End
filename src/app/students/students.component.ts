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

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [CommonModule, HeaderComponent, DashboardComponent, StudentCourseComponent, CoursesComponent, FooterComponent, EventsComponent, TeamComponent],
})
export class StudentsComponent implements OnInit {

  private studentService = inject(StudentService);
  students: Student[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}