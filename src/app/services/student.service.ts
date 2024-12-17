import {
  HttpClient,
  HttpHeaders,
  provideHttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5256/api/Admin/students';

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents() {
    return this.http.get<Student[]>(this.apiUrl)
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
 getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      map((data) => {
        // The API response already matches the Student interface, so you can return the data directly
        return {
          Fee: data.Fee,
          isRegistrationFeePaid: data.isRegistrationFeePaid,
          userId: data.userId,
          studentId: data.studentId,
          fullName: data.fullName,
          email: data.email,
          profilePicture: data.profilePicture,
          nicNumber: data.nicNumber,  // Ensure nicNumber is correctly mapped
          gender: data.gender,
          address: data.address,
          mobileNumber: data.mobileNumber,
          dateOfBirth: data.dateOfBirth,
        };
      })
    );
    }
    
  // Add a new student
  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, studentData); // Send POST request with student data
  }

  // Update an existing student
  updateStudent(id: number, student: Student){
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  // Delete a student
  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
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
