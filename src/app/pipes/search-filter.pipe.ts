import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../services/student.service';
import { Course } from '../services/course.service';
import { studentpayment } from '../admin/payment-table/payment-table.component';

@Pipe({
  name: 'searchCourse',
  standalone: true,
})
export class SearchCoursePipe implements PipeTransform {
  transform(courses: Course[], searchText: string): any[] {
    if (!courses || !searchText) {
      return courses;
    }
    // Convert search text to lowercase for case-insensitive search
    searchText = searchText.toLowerCase();

    // Filter courses by matching title or other fields
    return courses.filter(
      (course) =>
        course.courseName.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
        course.description.toLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
}

@Pipe({
  name: 'searchStudent',
  standalone: true,
})
export class SearchStudentPipe implements PipeTransform {
  transform(students: Student[], searchText: string): Student[] {
    if (!students || !searchText) {
      return students;
    }
    // Convert search text to lowercase for case-insensitive search
    searchText = searchText.toLowerCase();

    // Filter courses by matching title or other fields
    return students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

@Pipe({
  name: 'searchByNic',
  standalone: true,
})
export class SearchStudentByNicPipe implements PipeTransform {
  transform(students: Student[], searchNic: string): Student[] {
    if (!students || !searchNic) {
      return students;
    }
          // Filter students by matching title or other fields
    return students.filter(
      (student) =>
        student.nicNumber.includes(searchNic) 
    );
  }
}


@Pipe({
  name: 'courseFilter',
  standalone: true,
  pure: false // Set to false for it to update the filtered data when input changes
})
export class CourseFilterPipe implements PipeTransform {
  transform(courses: any[], searchText: string, selectedCourseType: string): any[] {
    if (!courses) {
      return [];
    }

    let filteredCourses = courses;

    // Filter by Course Type if selected
    if (selectedCourseType) {
      filteredCourses = filteredCourses.filter(course => course.type === selectedCourseType);
    }

    // Filter by search text (case-insensitive search)
    if (searchText) {
      filteredCourses = filteredCourses.filter(course =>
        course.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filteredCourses;
  }
}


@Pipe({
  name: 'charLimit',
  standalone: true,
})
export class WordLimitPipe implements PipeTransform {
  transform(value: string, charLimit: number): string {
  if (!value) {
    return '';
  }

  // Check if the character count exceeds the limit
  if (value.length > charLimit) {
    // Slice the string to the character limit
    return value.slice(0, charLimit) + '...'; // Add ellipsis at the end
  }

  return value;
}
}


// paginate.pipe.ts
@Pipe({
  name: 'paginate',
  standalone: true,

})
export class PaginatePipe implements PipeTransform {
  transform(items: any[], currentPage: number = 1, itemsPerPage: number = 5): any[] {
    if (!items || items.length === 0) {
      return [];
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }
}

// Export all pipes
export const Pipes = [SearchCoursePipe, SearchStudentPipe, SearchStudentByNicPipe, CourseFilterPipe,  WordLimitPipe, PaginatePipe];