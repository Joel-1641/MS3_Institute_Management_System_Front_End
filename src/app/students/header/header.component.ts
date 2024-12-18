import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaymentService, Notification } from '../../services/payment.service';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  // notifications = [
  //   {
  //     notificationId: 1,
  //     message: "Student Michael Brown (NIC: 986052216v) has selected their courses and is now ready to pay.",
  //     isRead: false,
  //     createdAt: "2024-12-15T12:26:29.8832707",
  //     notificationType: "Enrollment",
  //     target: "Admin",
  //     studentName: "Michael Brown",
  //     studentNIC: "986052216v"
  //   }]
  notifications: Notification[] = [];
  errorMessage: string | undefined;
  nic: string = '';
  student: any = {
    fullName: '',
    mobileNumber: '',
    address: '',
    profilePicture: '',
    nicNumber: '',
    courses: [],
  };

  studentId: number =  Number(localStorage.getItem('UserId')); // Dynamically set this value.

    constructor (private notificationService:PaymentService, private studentservice:StudentService){}

    ngOnInit(): void {
      this.fetchStudentData()
      this.getNotifications();
    }
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
     
    
    }
    );
    }

    getNotifications(): void {
      this.notificationService.getNotificationsByNic(this.nic).subscribe(
        (data: Notification[]) => {
          this.notifications = data;
          console.log(this.notifications)
          this.errorMessage = undefined; // Clear any previous error messages
        },
        (error: string) => {
          this.errorMessage = error;
          // this.notifications = []; // Clear previous notifications
        }
      );
    }




}
