import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

// import { CoursesComponent } from './admin/courses/courses.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { StudentsComponent } from './admin/students/students.component';
import { CourseEditComponent } from './admin/course-edit/course-edit.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { PaymentComponent } from './admin/payment/payment.component';



export const routes: Routes = [
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent},
  { path: 'students', component: StudentsComponent},
  { path: 'courses', component:CoursesComponent},
  { path: 'payment', component:PaymentComponent},
  { path: 'courses/add', component: CourseEditComponent},
  { path: 'courses/edit/:id', component: CourseEditComponent }, // Edit route
  
  // { path: 'update-profile', component: UpdateProfileComponent },
  // { path: 'change-password', component: ChangePasswordComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' }
  //

  // { path: '', redirectTo: 'listcourse', pathMatch: 'full' }, // Default route
  // {
  //     path: 'admin',
  //     component: SidebarComponent,
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
