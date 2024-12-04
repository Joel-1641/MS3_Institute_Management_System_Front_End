import { Component } from '@angular/core';
import { AnalyticsComponent } from "./analytics/analytics.component";
import { CoursesComponent } from "../home/courses/courses.component";
import { AddcourseComponent } from "./addcourse/addcourse.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { StudentsComponent } from './students/students.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { SitebarComponent } from "./sitebar/sitebar.component";
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [AnalyticsComponent, CoursesComponent, AddcourseComponent, DashboardComponent, LogoutComponent, StudentsComponent, NavbarComponent, SitebarComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {

}
