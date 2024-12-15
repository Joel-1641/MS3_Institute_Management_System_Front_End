import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../../services/student.service';
import { CourseApiResponse, CourseService } from '../../services/course.service';
import { Courses } from '../../Models/model';

@Component({
  selector: 'app-funfacts',
  standalone: true,
  imports: [],
  templateUrl: './funfacts.component.html',
  styleUrl: './funfacts.component.css'
})
export class FunfactsComponent implements OnInit {
  stud: Student[] = []; // All students data
  coursess:CourseApiResponse[]=[]

  constructor(private studentservice:StudentService,private courseservice:CourseService){

  }


  ngOnInit(): void {
    this.fetchStudents();
    this.fetchcourse();
    // this.initializeForm();
  }

  // Fetch students from the backend
  fetchStudents() {
    this.studentservice.getStudents().subscribe(data=>{
      this.stud = data
      console.log(this.stud)
    })
  }

  fetchcourse(){
    this.courseservice.getCourses().subscribe(data=>{
  this.coursess = data
  console.log('courses: ',this.coursess)

    })
  }

}
