import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Models/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  taskurl:string = 'http://localhost:5185/api/TaskItems'
  getTask(){
    return this.http.get<Task[]>(this.taskurl);
  }

  getTaskById(id:number){
    return this.http.get<Task>(this.taskurl + '/' + id);
  }

  addTask(addTask:Task){
    return this.http.post(this.taskurl,addTask);
  }

  updateTask(id:number, updateTask:Task){
    return this.http.put(this.taskurl+ '/' +id,updateTask);
  }

  deleteTask(id:number){
    return this.http.delete(this.taskurl +'/'+ id);
  }
}

