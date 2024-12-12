import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCourse',
  standalone: true,
})
export class SearchCoursePipe implements PipeTransform {
  transform(courses: any[], searchText: string): any[] {
    if (!courses || !searchText) {
      return courses;
    }
    // Convert search text to lowercase for case-insensitive search
    searchText = searchText.toLowerCase();

    // Filter courses by matching title or other fields
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchText) ||
        course.description.toLowerCase().includes(searchText)
    );
  }
}


@Pipe({
  name: 'searchStudent',
  standalone: true,
})
export class SearchStudentPipe implements PipeTransform {
  transform(students: any[], searchText: string): any[] {
    if (!students || !searchText) {
      return students;
    }
    // Convert search text to lowercase for case-insensitive search
    searchText = searchText.toLowerCase();

    // Filter students by matching title or other fields
    return students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) 
    );
  }
}

// Export all pipes
export const APP_PIPES = [SearchCoursePipe, SearchStudentPipe];