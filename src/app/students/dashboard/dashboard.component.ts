import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { PaymentService, PaymentStatus } from '../../services/payment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  student: any = {
    fullName: '',
    mobileNumber: '',
    address: '',
    profilePicture: '',
    nicNumber: '',
    courses: [],
  };
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;

  paymentDetails:PaymentStatus
    | null = null;
  nic: string = ''; // Replace with the NIC of the student

  studentId: number =  Number(localStorage.getItem('UserId')); // Dynamically set this value.

username: any;
studentsss:any
  selectedCourses: any[]=[];

  constructor(private http: HttpClient,private studentservice:StudentService,private courseservice:CourseService,private snackBar: MatSnackBar,private paymentservice: PaymentService ) {}

  ngOnInit() {
    // this.getstudent(this.studentId);
    this.fetchStudentData();
    this.getstudentcourse(this.studentId);
    this.loadPaymentDetails();
  }

//   getstudent(studentId: number){
//     this.studentservice.getStudentById(studentId).subscribe(data=>{
//       this.student = data
//  console.log(this.student)
//     })
//   }


  // Fetch student data and extract the NIC number
  fetchStudentData(): void {
        this.studentservice.getStudentById(this.studentId).subscribe(
      (data) => {
        this.student = data; // Store the student data
        this.nic = data.nicNumber; // Extract the NIC number from the response
        console.log('Student NIC:', this.nic);
       
      },
      (error) => {
        console.error('Error fetching student data:', error);
        this.snackBar.open('Failed to fetch student data', 'Close', { duration: 3000 });
    
      }
    );
  }


  loadPaymentDetails(): void {
    if (this.nic) {
      this.paymentservice.getPaymentStatus(this.nic).subscribe({
        next: (data) => {
          this.paymentDetails = data;
          console.log(this.paymentDetails)
        },
        error: (err) => {
          console.error('Error fetching payment details:', err);
        }
      });
    }
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
      this.http.put(`http://localhost:5256/api/Admin/students/${this.studentId}`, this.student).subscribe(response => {
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
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
