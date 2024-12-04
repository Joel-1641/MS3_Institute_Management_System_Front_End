import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LogoutComponent } from '../logout/logout.component';
import { AddcourseComponent } from '../addcourse/addcourse.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sitebar',
  standalone: true,
  imports: [CommonModule,CoursesComponent,AnalyticsComponent,DashboardComponent,LogoutComponent,AddcourseComponent],
  templateUrl: './sitebar.component.html',
  styleUrl: './sitebar.component.css'
})
export class SitebarComponent {

  constructor(private router:Router){}
  messages: any[] = [];
}
 