import { Component } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-course',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css'
})
export class StudentCourseComponent {
  courses: any[] = [];
  selectedCourses: any[] = [];
  nic:string=''
  studentid:number=3;


  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses();
    this.getstudentcourse(this.studentid)
  }

  fetchCourses(): void {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addCourse(course: Course){

    const requestBody = {
      nic: '986052216v',
      courses:[{
        courseName:course.courseName,
        level:course.level
      }]
    };
this.courseService.addstudentcourse(requestBody).subscribe(data=>{
  console.log(' course succesfully')
  this.getstudentcourse(this.studentid)
})




    // if (!this.selectedCourses.find((c) => c.id === course.courseId)) {
    //   this.selectedCourses.push(course);
    // }
  }

  removeCourse(courseId: number): void {
    this.selectedCourses = this.selectedCourses.filter((c) => c.id !== courseId);
  }

  getstudentcourse(id:number){
  this.courseService.getstudentcourse(id).subscribe(data=>{
    this.selectedCourses= data
  })
  }
}
