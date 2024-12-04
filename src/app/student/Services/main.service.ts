import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private client: HttpClient) {}
  private readonly Base_URL = environment.apiUrl;
  // Handling All request methods
  getAllStudents(){
    return this.client.get(this.Base_URL);
  }
  getStudentById(id:any){
    return this.client.get(`${this.Base_URL}/${id}`);
  }
  addStudent(newStudent:any){
    return this.client.post(this.Base_URL, newStudent);
  }
  deleteStudent(id:any){
    return this.client.delete(`${this.Base_URL}/${id}`);
  }
  updateStudent(id: number ,updateStudent: any){
    return this.client.put(this.Base_URL+"/"+id, updateStudent);
  }
}
