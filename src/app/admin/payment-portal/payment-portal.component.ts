import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { StudentService } from '../../services/student.service';
import { Pipes } from '../../pipes/search-filter.pipe';
import { MatSnackBar} from '@angular/material/snack-bar';  
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,Pipes],
  templateUrl: './payment-portal.component.html',
  styleUrl: './payment-portal.component.css'
})
export class PaymentPortalComponent {
  @ViewChild('addStudentModal') addStudentModal!: ElementRef;
  paymentForm: FormGroup;


  studentId: number | null = null;
  modalInstance: bootstrap.Modal | null = null;
  fileInputError: string = '';
  modalVisible: boolean = false; // Control modal visibility

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,private snackBar: MatSnackBar,private payservice:PaymentService
  ) {
    // Form Initialization
    this.paymentForm = this.fb.group({
      fullNic : ['', [Validators.required]],
      registrationFee: [
        
        [Validators.required], // positive number validation
      ],
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // Check if editing a student
      this.route.queryParams.subscribe((queryParams) => {
        const isAdding = queryParams['addStudent'] === 'true';
      });
    });
  }

  // Ensure the modal is shown only after the view is initialized
  ngAfterViewInit(): void {
    // Delay modal initialization to ensure it is in the DOM
    setTimeout(() => this.showModal(), 0);
  }



  private showModal(): void {
    if (this.addStudentModal) {
      const modalElement = this.addStudentModal.nativeElement;
      if (!this.modalInstance) {
        this.modalInstance = new bootstrap.Modal(modalElement);
      }
      this.modalInstance.show();
    }
  }

  onClose() {
    this.modalVisible = false;
    this.modalInstance?.hide();
    this.router.navigate(['/students']);
  }
  onBackdropClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Prevent modal from closing when clicked inside
  onModalClick(event: MouseEvent) {
    event.stopPropagation(); // Stop event propagation to backdrop
  }

  // Open modal method (you can use it to toggle visibility)
  openModal() {
    const modalElement = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(modalElement!); // Create a modal instance
    modal.show(); // Show the modal
  }

  private closeModal(shouldNavigate: boolean = true): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.modalInstance = null;
    }
    if (shouldNavigate) {
      this.router.navigate(['/payment']);
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const { fullNic, registrationFee } = this.paymentForm.value;


    // Now you can use `nic` and `registrationFee` as regular variables
    console.log('NIC:', fullNic);
    console.log('Registration Fee:', registrationFee);


    const paymentData = { nic: fullNic, amount: registrationFee };
      // Call the payment service to process the payment
      this.payservice
        . submitPayment(paymentData)
        .subscribe({
          next: (response) => {
            // Handle success, e.g., show success message or navigate
            console.log('Payment successful');
            // Optionally navigate to another page after successful payment
             this.router.navigate(['/payment']);
          },
          error: (error) => {
            // Handle error, e.g., show error message
            console.error('Payment failed');
          },
        });
    } else {
      console.log('Form is invalid');
      // Optionally, trigger some validation messages or feedback
    }
  }

  // Handle closing the modal or clearing the form
  onCloseed() {
    this.paymentForm.reset();
  }

  goback(){
    this.router.navigate(['/payment']);

  }
  // Separate method to handle saving the student
  
}
