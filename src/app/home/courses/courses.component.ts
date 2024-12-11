import { Component, OnInit } from '@angular/core';
import { CourseService,CourseApiResponse } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent  implements OnInit {
    courses: any[] = [];
    filter = '*'; // To manage filters dynamically
    filteredCourses: any[] = [];
    errorMessage = '';
    isLoading = true;

    constructor(private coursesService: CourseService) {}
    ngOnInit(): void {
      this.fetchCourses();
    }
  
    fetchCourses(): void {
      this.coursesService.getCourses().subscribe(
        (data) => {
          // Add extra properties for UI control
          this.courses = data.map(course => ({ 
            ...course, 
            showReadMore: false, 
            showDescription: false 
          }));
          this.filteredCourses = this.courses; // Default to show all courses
        },
        (error) => {
          console.error('Error fetching courses', error);
        }
      );
    }

    filterCourses(category: string): void {
      this.filter = category;
      if (category === '*') {
        this.filteredCourses = this.courses;
      } else {
        this.filteredCourses = this.courses.filter((course) => course.category === category);
      }
    }

    toggleDescription(course: any): void {
      course.showDescription = !course.showDescription;
    }

    setFilter(filter: string): void {
      this.filter = filter;
    }
  }
  

