import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { CourseEditComponent } from './admin/course-edit/course-edit.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { StudentRegisterComponent } from './admin/student-register/student-register.component';
import { StudentComponent } from './admin/student/student.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },

  { path: 'students', component: StudentComponent },
  { path: 'courses', component: CoursesComponent },

  { path: 'students/register', component: StudentRegisterComponent },
  { path: 'students/edit/:id', component: StudentRegisterComponent },
  
  { path: 'courses/add', component: CourseEditComponent },
  { path: 'courses/edit/:id', component: CourseEditComponent }, 
  
  { path: 'payment', component: PaymentComponent },

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
