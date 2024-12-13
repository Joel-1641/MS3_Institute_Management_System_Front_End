import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://your-api-url/api'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getRegisteredStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/students/registered`);
  }

  getStudentDetails(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/students/${studentId}`);
  }

  makePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments`, paymentData);
  }
}
