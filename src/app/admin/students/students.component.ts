import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  studentsData = [
    {
      name: 'John Doe',
      date: 'March 5, 2022',
      courseName: 'Full Stack Development',
      avatar: 'https://images.unsplash.com/photo-1603415526960-f0b1a1d6c2db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
    {
      name: 'Jane Smith',
      date: 'April 10, 2022',
      courseName: 'Data Science',
      avatar: 'https://images.unsplash.com/photo-1610444463205-5275426db49e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
    // Add more student entries
  ];

  deleteStudent(index: number): void {
    this.studentsData.splice(index, 1);
  }
}
