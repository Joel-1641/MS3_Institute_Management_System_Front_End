import { Pipe, PipeTransform } from '@angular/core';
import { studentpayment } from '../admin/payment-table/payment-table.component';

@Pipe({
  name: 'searchname',
  standalone: true
})
export class SearchnamePipe implements PipeTransform {

  transform(students: studentpayment[], searchText: string): studentpayment[] {
    if (!students || !searchText) {
      return students;
    }
    // Convert search text to lowercase for case-insensitive search
    searchText = searchText.toLowerCase();

    // Filter courses by matching title or other fields
    return students.filter(
      (student) =>
        student.studentName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
