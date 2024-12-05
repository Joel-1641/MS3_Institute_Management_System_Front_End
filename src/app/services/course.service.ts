import { Injectable } from '@angular/core';
import{Courses} from '../models/model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  adminurl:string = 'http://localhost:5256/api/Admin/';

  constructor(private http: HttpClient) { }

  getCourse(){
    return this.http.get<Courses[]>(this.);
  }

  getCourseById(id:number){
    return this.http.get<Courses>(this.adminurl + '/' + id);
  }

  addCourse(addCourse:Courses){
    return this.http.post(this.adminurl,addCourse);
  }

  updateCourse(id:number, updateCourse:Courses){
    return this.http.put(this.adminurl+ '/' +id,updateCourse);
  }

  deleteCourse(id:number){
    return this.http.delete(this.adminurl +'/'+ id);
  }
}
