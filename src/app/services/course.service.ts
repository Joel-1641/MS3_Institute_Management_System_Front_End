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

  getCourses(): Observable<Course[]> {
    return this.http.get<CourseApiResponse[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((item) => ({
          id: item.courseId,
          name: item.courseName,
          level: item.level,
          fee: item.courseFee,
          description: item.description,
          image: 'https://via.placeholder.com/300x150?text=' + item.courseName // Placeholder image
        }))
      )
    );
  }
}

export interface CourseApiResponse {
  courseId: number;
  courseName: string;
  level: string;
  courseFee: number;
  description: string;
}

export interface Course {
  id: number;
  name: string;
  level: string;
  fee: number;
  description: string;
  image: string;
}