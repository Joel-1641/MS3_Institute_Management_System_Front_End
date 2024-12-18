import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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


  getPaymentStatus(nic: string): Observable<any> {
    return this.http.get<PaymentStatus>(`${this.apiUrl}/${nic}`);
  }

  // Method to get the student report from the API
  getStudentReport(nic:string) {
   return this.http.get<StudentReport>(`http://localhost:5256/api/StudentCourse/report/${nic}`)
  }



private payapiUrl = 'http://localhost:5256/api/StudentCourse/payment-notifications';

getNotificationsByNic(nic: string): Observable<Notification[]> {
  const url = `${this.apiUrl}/${nic}`;
  return this.http.get<Notification[]>(url).pipe(
    catchError(this.handleError)
  );
}
private handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
  }
  return throwError(errorMessage);
}


}



export interface PaymentStatus {
  studentId: number;
  studentName: string;
  totalFee: number;
  totalPaid: number;
  paymentDue: number;
  paymentStatus: string;
  nic: string | null;
}

export interface Notification {
  notificationId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  notificationType: string;
  target: string;
  studentName: string;
  studentNIC: string;
}