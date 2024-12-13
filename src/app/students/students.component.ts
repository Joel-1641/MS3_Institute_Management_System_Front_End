import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../../services/student.service';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [CommonModule, StudentRegistrationComponent,RouterLink],
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