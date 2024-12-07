import { Injectable } from '@angular/core';
import{Students, Courses} from '../models/model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminurl:string = 'http://localhost:5256/api/Admin/';

  constructor(private http: HttpClient) { }

  getAllStudents() {
    return this.http.get<Students[]>(this.adminurl);
  }

  addStudent(students: Students) {
    return this.http.post(this.adminurl, students);
  }

  deleteStudents(studentsId: number) {
    return this.http.delete(this.adminurl + "/" + studentsId);
  }

  getStudents(studentsId: number) {
    return this.http.get<Students>(this.adminurl + "/" + studentsId);
  }

  // updateStudents(students: Students) {
  //   return this.http.put(this.adminurl + "/" + students.Id, students);
  // }


 
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
