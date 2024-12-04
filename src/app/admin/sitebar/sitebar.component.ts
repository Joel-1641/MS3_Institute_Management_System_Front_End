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
  imports: [CommonModule, CoursesComponent, AnalyticsComponent, DashboardComponent, LogoutComponent, AddcourseComponent],
  templateUrl: './sitebar.component.html',
  styleUrl: './sitebar.component.css'
})
export class SitebarComponent {

  constructor(private router: Router) { }
  messages: any[] = [];
}

interface message {
  name: string;
  location: string;
  avatar: string;
  isOnline: boolean;
}

const messages: message[] = [
  {
    name: "Michael Jordan",
    location: "Bucharest, RO",
    avatar: "", // Add a URL or leave empty if not available
    isOnline: false,
  },
  {
    name: "Heather Wright",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
    isOnline: true,
  },
];
