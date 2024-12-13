import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  students: any[] = []; // List of registered students
  selectedStudent: any = null; // Details of the selected student
  paymentForm!: FormGroup;

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadRegisteredStudents();

    // Initialize the payment form
    this.paymentForm = this.fb.group({
      studentId: [''],
      courseId: [''],
      amount: [''],
      paymentStatus: ['Pending'], // Default status
    });
  }

  loadRegisteredStudents(): void {
    this.paymentService.getRegisteredStudents().subscribe((data) => {
      this.students = data;
    });
  }

  selectStudent(studentId: string): void {
    this.paymentService.getStudentDetails(studentId).subscribe((data) => {
      this.selectedStudent = data;
    });
  }

  makePayment(): void {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      this.paymentService.makePayment(paymentData).subscribe((response) => {
        alert('Payment successful!');
        this.paymentForm.reset();
        this.selectedStudent = null;
      });
    }
  }

  getPaymentClass(payment: string): string {
    switch (payment) {
      case 'Done':
        return 'bg-success';
      case 'Pending':
        return 'bg-danger';
      case 'Failed':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  tableData = [
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      Payment: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
    {
      name: 'Robert Fox',
      date: 'Feb 15, 2021',
      courceName: 'WEB DEV',
      amount: 3500,
      Offer: '15%',
      Payment: 'Done',
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
    },
  ];

}