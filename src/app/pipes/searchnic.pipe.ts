import { Pipe, PipeTransform } from '@angular/core';
import { studentpayment } from '../admin/payment-table/payment-table.component';

@Pipe({
  name: 'searchnic',
  standalone: true
})
export class SearchnicPipe implements PipeTransform {

  transform(students: studentpayment[], searchNic: string): studentpayment[] {
    if (!students || !searchNic) {
      return students;
    }
          // Filter students by matching title or other fields
    return students.filter(
      (student) =>
        student.nic.includes(searchNic) 
    );
  }

}
