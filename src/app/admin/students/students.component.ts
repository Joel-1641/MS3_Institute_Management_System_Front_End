import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../../services/student.service';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';

@Component({
  selector: 'app-students',
  standalone: true,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  imports: [CommonModule, StudentRegistrationComponent],
})
export class StudentsComponent {

  private studentService = inject(StudentService);
  students: Student[] = [];
  isLoading = true;
  errorMessage = '';
  constructor() {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log(this.students);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  // students = [
  //   {
  //     studentId: 1,
  //     userId: 0,
  //     fullName: "Joel",
  //     email: "jo@gmail.com",
  //     profilePicture: null,
  //     nicNumber: "983091113V",
  //     gender: "Male",
  //     address: "string",
  //     mobileNumber: 772389081,
  //     dateOfBirth: "2004-12-07T05:46:03.545",
  //   }
  // ];
}
