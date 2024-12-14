import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent {
  courses: any[] = [];
  selectedCourses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addCourse(course: any): void {
    if (!this.selectedCourses.find((c) => c.id === course.id)) {
      this.selectedCourses.push(course);
    }
  }

  removeCourse(courseId: number): void {
    this.selectedCourses = this.selectedCourses.filter((c) => c.id !== courseId);
  }
}
