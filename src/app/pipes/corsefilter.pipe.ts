import { Pipe, PipeTransform } from '@angular/core';
import { CourseApiResponse } from '../services/course.service';

@Pipe({
  name: 'corsefilter',
  standalone: true
})
export class CorsefilterPipe implements PipeTransform {

  transform(value: CourseApiResponse[], searchText:string): CourseApiResponse[] {
       // Convert search text to lowercase for case-insensitive comparison
       const lowerSearchText = searchText.toLowerCase();

       // Filter the courses based on description, courseType, or courseName
       return value.filter(course =>
         course.description?.toLowerCase().includes(lowerSearchText) ||
         course.courseType?.toLowerCase().includes(lowerSearchText) ||
         course.courseName?.toLowerCase().includes(lowerSearchText)
       );
  }

}
