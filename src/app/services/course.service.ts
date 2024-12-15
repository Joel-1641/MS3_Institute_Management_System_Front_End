import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://localhost:5256/api/Admin/courses'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<CourseApiResponse[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((item) => ({
          id: item.courseId,
          name: item.courseName,
          level: item.level,
          fee: item.courseFee,
          description: item.description,
          // image: 'https://via.placeholder.com/300x150?text=' + item.courseName,// Placeholder image
          image: item.courseImg,// Placeholder image
          category:item.courseType
        }))
      )
    );
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
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
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
  id: number;
  name: string;
  level: string;
  fee: number;
  description: string;
  image: string;
  category: string
}
