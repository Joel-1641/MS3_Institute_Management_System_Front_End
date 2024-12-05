import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LogoutComponent } from '../logout/logout.component';
import { AddcourseComponent } from '../addcourse/addcourse.component';
import { Router, RouterModule } from '@angular/router';
import { ListcoursesComponent } from '../listcourses/listcourses.component';

@Component({
  selector: 'app-sitebar',
  standalone: true,
  imports: [RouterModule, CommonModule,ListcoursesComponent, AnalyticsComponent, DashboardComponent, LogoutComponent, AddcourseComponent],
  templateUrl: './sitebar.component.html',
  styleUrl: './sitebar.component.css'
})
export class SitebarComponent {

  constructor(private router: Router) { }
   messages: messages[] = [
    {
      name: "Michael Jordan",
      location: "Bucharest, RO",
      avatar: "/member-03.jpg", // Add a URL or leave empty if not available
    },
    {
      name: "Heather Wright",
      location: "London, UK",
      avatar: "https://th.bing.com/th?id=OIP.YUJohr60HfO0OEzH7eWzsQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    }, ];
}

interface messages {
  name: string;
  location: string;
  avatar: string;
}


