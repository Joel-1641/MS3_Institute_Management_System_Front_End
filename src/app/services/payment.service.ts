import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { studentpayment } from '../admin/payment-table/payment-table.component';
import { StudentReport } from '../admin/report/report.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  processPayment(fullName: any, registrationFee: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5256/api/StudentCourse/payment-status'; // Base API URL, change if needed

  constructor(private http: HttpClient) { }

  // Fetch all payment details
  getPaymentDetails() {
    return this.http.get<studentpayment[]>(`${this.apiUrl}`);
  }

  // Submit payment
  submitPayment(paymentData: { nic: string; amount: number }) {
    return this.http.post(`http://localhost:5256/api/StudentCourse/record-payment`, paymentData);
  }



  private reporturl = 'http://localhost:5256/api/StudentCourse/report/'; // The API endpoint



  // Method to get the student report from the API
  getStudentReport(nic:string) {
   return this.http.get<StudentReport>(`http://localhost:5256/api/StudentCourse/report/${nic}`)
  }
}
