import { Routes } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { StudentComponent } from './admin/student/student.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { StudentRegisterComponent } from './admin/student-register/student-register.component';
import { CourseEditComponent } from './admin/course-edit/course-edit.component';
import { PaymentTableComponent } from './admin/payment-table/payment-table.component';
import { PaymentPortalComponent } from './admin/payment-portal/payment-portal.component';
import { ReportComponent } from './admin/report/report.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
       { path: 'analytics', component: AnalyticsComponent },

      { path: 'students', component: StudentComponent },
       { path: 'courses', component: CoursesComponent },

      { path: 'students/register', component: StudentRegisterComponent },
      { path: 'students/edit/:id', component: StudentRegisterComponent },

      { path: 'courses/add', component: CourseEditComponent },
      { path: 'courses/edit/:id', component: CourseEditComponent },

      { path: 'payment', component: PaymentTableComponent },
      {path:'portal',component:PaymentPortalComponent},
      {path:'report',component:ReportComponent},
      // { path: 'Account', component: HomeComponent },
      { path: 'logout', component: HomeComponent },
    ],
  },
  // },
  { path: 'student-dashboard/:userId', component: StudentsComponent },

];
















// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

// { path: '', component: LoginComponent },

// { path: 'dashboard', component: DashboardComponent },
// { path: 'analytics', component: AnalyticsComponent },

// { path: 'students', component: StudentComponent },
// { path: 'courses', component: CoursesComponent },

// { path: 'students/register', component: StudentRegisterComponent },
// { path: 'students/edit/:id', component: StudentRegisterComponent },

// { path: 'courses/add', component: CourseEditComponent },
// { path: 'courses/edit/:id', component: CourseEditComponent },

// { path: 'payment', component: PaymentComponent },

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
// ];
