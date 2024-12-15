import { Component, NgModule, OnInit } from '@angular/core';
import { CourseService,CourseApiResponse } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { data, error } from 'jquery';
import { FormsModule, NgModel } from '@angular/forms';
import { CorsefilterPipe } from "../../pipes/corsefilter.pipe";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CorsefilterPipe,FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent  implements OnInit {
    courses: CourseApiResponse[] = [];
    filter = '*'; // To manage filters dynamically
    filteredCourses: any[] = [];
    errorMessage = '';
    isLoading = true;
searchText: string='';

    constructor(private coursesService: CourseService) {}
    ngOnInit(): void {
      this.fetchCourses();
    }
  
    fetchCourses(): void {
      this.coursesService.getCourses().subscribe(
        (data) => {
          this.courses = data; // Assign the data to the `courses` array
          console.log('Courses fetched successfully:', this.courses);
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
        this.filteredCourses = this.courses.filter((course) => course.courseType === category);
      }
    }

    toggleDescription(course: any): void {
      course.showDescription = !course.showDescription;
    }

    setFilter(filter: string): void {
      this.filter = filter;
    }
  }
  

