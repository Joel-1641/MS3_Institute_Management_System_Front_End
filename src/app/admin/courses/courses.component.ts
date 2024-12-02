import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  coursesData = [
    { name: 'Web Development', level: 'Beginner', fee: 1500 },
    { name: 'Data Science', level: 'Intermediate', fee: 2000 },
    { name: 'Cloud Computing', level: 'Advanced', fee: 2500 }
    // Add more courses if needed
  ];

  editCourse(index: number): void {
    alert(`Edit course: ${this.coursesData[index].name}`);
    // Add actual edit functionality here
  }

  deleteCourse(index: number): void {
    if (confirm(`Are you sure you want to delete ${this.coursesData[index].name}?`)) {
      this.coursesData.splice(index, 1);
    }
  }
}
