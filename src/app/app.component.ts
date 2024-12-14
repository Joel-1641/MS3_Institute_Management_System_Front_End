import { Component } from '@angular/core';
import {  StudentsComponent } from "../app/students/students.component";
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentsComponent, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT Scholar';


  
}
