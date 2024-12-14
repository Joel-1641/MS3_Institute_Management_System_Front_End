import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import bootstrap from 'bootstrap';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  paymentDetails: any[] = []; // Holds the payment data fetched from the API
  paymentData = { nic: '', amount: 0 }; // Data bound to the form

  constructor(private paymentService: PaymentService) {}  // Inject PaymentService

  ngOnInit(): void {
    this.fetchPaymentDetails();
  }

  // Fetch payment details from the PaymentService
  fetchPaymentDetails(): void {
    this.paymentService.getPaymentDetails().subscribe(
      (data) => {
        this.paymentDetails = data;
      },
      (error) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }

  // Open the payment modal and set NIC for the selected student
  openPaymentPortal(nic: string): void {
    this.paymentData.nic = nic;
    const paymentModal = new bootstrap.Modal(
      document.getElementById('paymentModal') as HTMLElement
    );
    paymentModal.show();
  }

  // Submit the payment via the PaymentService
  submitPayment(): void {
    this.paymentService.submitPayment(this.paymentData).subscribe(
      (response) => {
        alert('Payment successful!');
        this.closeModal();
        this.fetchPaymentDetails(); // Refresh the table after payment is made
      },
      (error) => {
        alert('Payment failed. Please try again.');
        console.error('Error submitting payment:', error);
      }
    );
  }

  // Close the modal
  private closeModal(): void {
    const paymentModal = bootstrap.Modal.getInstance(
      document.getElementById('paymentModal') as HTMLElement
    );
    paymentModal?.hide();
  }

}