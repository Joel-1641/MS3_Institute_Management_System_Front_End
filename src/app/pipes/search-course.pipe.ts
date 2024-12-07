import { Pipe, PipeTransform } from '@angular/core';
import{Courses} from '../models/model'
@Pipe({
  name: 'searchCourse',
  standalone: true
})
export class SearchCoursePipe implements PipeTransform {

  transform(value: Courses[], searchText: string): Courses[] {
    if(!value) return [];
    if(!searchText) return value;
    

    return value.filter((course:Courses) => {
      return course.courseName.toString().toLowerCase().includes(searchText.toString().toLowerCase()) || course.description.toString().toLowerCase().includes(searchText.toString().toLowerCase())
     })
  }

}
