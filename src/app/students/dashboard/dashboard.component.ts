import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentApiResponse, StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  student: any = {
    name: '',
    phone: '',
    address: '',
    photoUrl: '',
    courses: [],
  };
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;

  feeDetails: any = {
    paid: 0,
    due: 0,
  };
  studentid:number=3;

username: any;
studentsss:any
  selectedCourses: any[]=[];

  constructor(private http: HttpClient,private studentservice:StudentService,private courseservice:CourseService) {}

  ngOnInit() {
    this.getstudent(this.studentid)
    this.getstudentcourse(this.studentid)
  }

  getstudent(studentid: number){
    this.studentservice.getStudentById(studentid).subscribe(data=>{
      this.studentsss = data
 console.log(this.studentsss)
    })
  }

  // fetchStudentData(): void {
  //   this.http.get('/api/student').subscribe((data: any) => {
  //     this.student = data;
  //   });
  // }

  // fetchFeeDetails(): void {
  //   this.http.get('/api/fees').subscribe((data: any) => {
  //     this.feeDetails = data;
  //   });
  // }

  calculateDaysLeft(enrolledDate: string, duration: number): number {
    const startDate = new Date(enrolledDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration);
    const today = new Date();

    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  }
// Function to update profile
  updateProfile(profileForm: NgForm) {
    if (profileForm.valid) {
      this.http.put('API_URL_TO_UPDATE_PROFILE', this.student).subscribe(response => {
        alert('Profile updated successfully!');
      }, error => {
        console.error('Error updating profile', error);
      });
    }
  }
  getstudentcourse(id:number){
    this.courseservice.getstudentcourse(id).subscribe(data=>{
      this.selectedCourses= data
    })
    }
  // Function to update password
  updatePassword(passwordForm: NgForm) {
    if (this.newPassword.length < 8) {
      this.passwordError = true;
      return;
    }
    if (this.newPassword === this.confirmPassword) {
      const passwordData = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.http.put('API_URL_TO_UPDATE_PASSWORD', passwordData).subscribe(response => {
        alert('Password updated successfully!');
      }, error => {
        console.error('Error updating password', error);
      });
    } else {
      alert('Passwords do not match!');
    }
  }
  openProfileModal(): void {
    // Logic to open profile modal
  }

  openAccountModal(): void {
    // Logic to open account modal
  }
}
