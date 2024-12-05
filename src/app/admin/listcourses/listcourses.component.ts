import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchCoursePipe } from '../../pipes/search-course.pipe'
import { Courses } from '../../models/model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-listcourses',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchCoursePipe],
  providers: [BsModalService],
  templateUrl: './listcourses.component.html',
  styleUrl: './listcourses.component.css'
})
export class ListcoursesComponent {
  Courses: Courses[] = [];
  SearchText: string = "";
  taskId: number = 0
  modalRef?: BsModalRef;

  constructor(private courseService: CourseService, private router: Router, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    // this.listTasks();
  }

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

  GoToAddCourse() {
    this.router.navigate(['/admin/user-add']);
  }
}
