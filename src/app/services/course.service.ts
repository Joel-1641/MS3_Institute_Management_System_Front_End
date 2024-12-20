import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:5256/api/Admin/courses'; 
  private apiUrl2 = 'http://localhost:5256/api/StudentCourse'; 

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<CourseApiResponse[]>(`${this.apiUrl}`);
  }

  // Fetch a course by ID
  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new course
  addCourse(course: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, course);
  }

  // Update an existing course
  updateCourse(id: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, course);
  }

  // Delete a course by ID
  deleteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }





  
  addstudentcourse(request: any) {
    return this.http.post(`${this.apiUrl2}/add-courses`,request);
  }
  getstudentcourse(id: number) {
    return this.http.get<any[]>(
      `${this.apiUrl2}/student/${id}/courses`
    );
  }
}

export interface CourseApiResponse {
  courseId: number;
  courseName: string;
  level: string;
  courseFee: number;
  courseDuration: string;
  courseImg: string;
  description: string;
  courseType: string;
}

export interface Course {
  courseId: number;
  courseName: string;
  level: string;
  courseFee: number;
  courseDuration: string;
  courseImg: string;
  description: string;
  courseType: string;
}
