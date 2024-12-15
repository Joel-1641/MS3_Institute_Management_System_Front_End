import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
} from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Students } from '../Models/model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:5256/api/Admin/students';

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents() {
    return this.http.get<Student[]>(`${this.apiUrl}`)
      // map((data) =>
      //   data.map((item) => ({
      //     Fee: item.registrationFee,
      //     isRegistrationFeePaid: item.isRegistrationFeePaid,
      //     userId: item.userId,
      //     id: item.studentId,
      //     name: item.fullName,
      //     email: item.email,
      //     profilePicture: item.profilePicture,
      //     nic: item.nicNumber,
      //     gender: item.gender,
      //     address: item.address,
      //     mobileNumber: item.mobileNumber,
      //     dateOfBirth: item.dateOfBirth,
      //   }))
      // )
    
  }

  // Fetch a course by ID
  getStudentById(id: number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  // Add a new student
  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, studentData); // Send POST request with student data
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
export interface StudentApiResponse {
  registrationFee: number;
  isRegistrationFeePaid: boolean;
  userId: number;
  studentId: number;
  fullName: string;
  email: string;
  profilePicture: string;
  nicNumber: string;
  gender: string;
  address: string;
  mobileNumber: number;
  dateOfBirth: string;
}

export interface Student {
  Fee: number;
  isRegistrationFeePaid: boolean;
  userId: number;
  id: number;
  fullName: string;
  email: string;
  profilePicture: string;
  nicNumber: string;
  gender: string;
  address: string;
  mobileNumber: number;
  dateOfBirth: string;
}
