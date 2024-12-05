import { Injectable } from '@angular/core';
import{Students} from '../models/model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

}
