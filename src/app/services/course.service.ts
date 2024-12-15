import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:5256/api/Admin/courses'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCourses(){
    return this.http.get<CourseApiResponse[]>('http://localhost:5256/api/Admin/courses')
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
  deleteCourse(id: number){
    return this.http.delete(`http://localhost:5256/api/Admin/courses/${id}`);
  }
}

export interface CourseApiResponse {
  courseId: number;
  courseName: string;
  level: string;
  courseFee: number;
  courseDuration : string;
  courseImg : string;
  description: string;
  courseType : string
}

export interface Course {
  courseId: number;
  courseName: string;
  level: string;
  courseFee: number;
  courseDuration : string;
  courseImg : string;
  description: string;
  courseType : string
}
