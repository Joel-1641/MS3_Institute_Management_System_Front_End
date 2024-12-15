import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  nic: string = ''; // The NIC entered by the user
  reportDatas!: StudentReport; // To hold the fetched report data
  isLoading: boolean = false; // Flag to show loading state
  errorMessage: string = ''; // To hold error messages if any

  // reportData: StudentReport = {
  //   studentId: 2,
  //   studentName: 'Jane Smith',
  //   nic: '986052215v',
  //   courses: [
  //     {
  //       courseId: 5,
  //       courseName: 'Cloud Computing',
  //       level: 'Beginner',
  //       courseFee: 15000,
  //       courseDuration: '3 months',
  //       courseType: 'Cloud and DevOps'
  //     },
  //     {
  //       courseId: 7,
  //       courseName: 'Networking',
  //       level: 'Beginner',
  //       courseFee: 15000,
  //       courseDuration: '3 months',
  //       courseType: 'Security and Networking'
  //     }
  //   ],
  //   paymentDetails: {
  //     totalFee: 30000,
  //     totalPaid: 31000,
  //     paymentDue: -1000,
  //     paymentStatus: 'Paid'
  //   }
  // };




  constructor(private paymentservice: PaymentService , private router:Router) {}

  // OnInit lifecycle hook to fetch the report data when the component is initialized
  ngOnInit(): void {
    this.fetchReport();
  }

  // Method to fetch the report data
  fetchReport(): void {
    if (!this.nic) {
      this.errorMessage = 'Please enter a valid NIC.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Clear previous error messages

    this.paymentservice.getStudentReport(this.nic).subscribe(
      (data) => {
        this.reportDatas = data; // Assign the fetched data to the reportData variable
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching report data', error);
        this.errorMessage = 'An error occurred while fetching the report.';
        this.isLoading = false;
      }
    );
  }

  // Function to trigger print functionality
  printReport() {
    window.print();
  }

goadmin(){
  this.router.navigate(['/admin'])
}


}

// report.model.ts
export interface Course {
  courseId: number;
  courseName: string;
  level: string;
  courseFee: number;
  courseDuration: string;
  courseType: string;
}

export interface PaymentDetails {
  totalFee: number;
  totalPaid: number;
  paymentDue: number;
  paymentStatus: string;
}

export interface StudentReport {
  studentId: number;
  studentName: string;
  nic: string;
  courses: Course[];
  paymentDetails: PaymentDetails;
}

