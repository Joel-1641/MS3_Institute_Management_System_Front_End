import { HttpClient, provideHttpClient } from '@angular/common/http';
import {Component, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class StudentService { 
  constructor(private http: HttpClient) {}

  getStudents(){
    return this.http.get<any[]>('http://localhost:5256/api/Admin/students');
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
