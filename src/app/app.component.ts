import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from "./admin/admindashboard.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AddcourseComponent } from "./admin/addcourse/addcourse.component";
import { CoursesComponent } from "./home/courses/courses.component";
import { ListcoursesComponent } from "./admin/listcourses/listcourses.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DashboardComponent, AddcourseComponent, CoursesComponent, ListcoursesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT Scholar';


  
}
