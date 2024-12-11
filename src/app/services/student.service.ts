import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5256/api/Admin/students';

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // Add a new student
  addStudent(studentData: any): Observable<any> {
    return this.http.post(this.apiUrl, studentData);  // Send POST request with student data
  }
  
  

  // Update an existing student
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export interface Student {
  registrationFee: number;
  isRegistrationFeePaid: boolean;
  userId: number;
  fullName: string;
  email: string;
  roleName: string | null;
  profilePicture: string | null;
  nicNumber: string;
  gender: string;
  address: string;
  mobileNumber: number;
  dateOfBirth: string;
}
