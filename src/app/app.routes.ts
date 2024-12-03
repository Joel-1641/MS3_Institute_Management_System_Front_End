import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { DashboardComponent } from '../app/admin/dashboard/dashboard.component';
import { StudentsComponent } from '../app/admin/students/students.component';
import { CoursesComponent } from '../app/admin/courses/courses.component';
import { LoginComponent } from './login/login.component';
import { SignupPageComponent } from './login/signup-page/signup-page.component';
import { AuthGuard } from './auth/auth-guard.guard';

export const routes: Routes = [

  // { path: '', component: HomeComponent },
  // {
  //   path: 'login',
  //   component: LoginComponent},
  // {
  //   path: 'admin',
  //   component: NavbarComponent,
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'analytics', component: AnalyserNode },
  //     { path: 'students', component: StudentsComponent },
  //     { path: 'courses', component: CoursesComponent },
  //     { path: 'logout', component: HomeComponent }
  //   ]
  // },
  // { path: '**', redirectTo: '' } 

  { path: '', component: HomeComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin', component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'analytics', component: AnalyserNode },
      { path: 'students', component: StudentsComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'logout', component: HomeComponent }
    ]
  }
];

