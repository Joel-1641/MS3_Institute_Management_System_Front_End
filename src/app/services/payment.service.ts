import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:5256/api/studentcourse'; // Base API URL, change if needed

  constructor(private http: HttpClient) { }

  // Fetch all payment details
  getPaymentDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payment-details`);
  }

  // Submit payment
  submitPayment(paymentData: { nic: string; amount: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/make-payment`, paymentData);
  }
}
