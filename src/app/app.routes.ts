import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { SitebarComponent } from './admin/sitebar/sitebar.component';
import { StudentsComponent } from './admin/students/students.component';
import { AdmindashboardComponent } from './admin/admindashboard.component';
import { ListcoursesComponent } from './admin/listcourses/listcourses.component';
import { CourseaddComponent } from './admin/courseadd/courseadd.component';
import { CoursesComponent } from './home/courses/courses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listcourse', pathMatch: 'full' }, // Default route
  { path: 'listcourse', component: ListcoursesComponent },
  // {
  //     path: 'admin',
  //     component: SitebarComponent,
  //     children: [
  //         { path: 'dashboard', component: DashboardComponent },
  //         { path: 'analytics', component: AnalyticsComponent },
  //         { path: 'students', component: StudentsComponent },
  //         { path: 'courses', component: CoursesComponent },
  //         { path: '', redirectTo: 'sitebar', pathMatch: 'full' }, // Default child route
  //     ],
  // },
  // { path: '**', redirectTo: '/home' }, // Wildcard route
//   {
//     path: 'admin',
//     component: AdmindashboardComponent,
//     children: [
//       { path: 'analytics', component: AnalyticsComponent },
//       { path: 'courses', component: CoursesComponent },
//       { path: 'dashboard', component: DashboardComponent },
//     ],
//   },
//   { path: 'listcourse', component: ListcoursesComponent },
];
