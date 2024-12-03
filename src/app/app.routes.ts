import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard.component';

export const routes: Routes = [
   
        // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        // { path: 'dashboard', loadComponent: () => import('../app/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
        // { path: 'analytics', loadComponent: () => import('../app/admin/analytics/analytics.component').then(m => m.AnalyticsComponent) },
        // { path: 'students', loadComponent: () => import('../app/admin/students/students.component').then(m => m.StudentsComponent) },
        // { path: 'courses', loadComponent: () => import('../app/admin/courses/courses.component').then(m => m.CoursesComponent) },
        // { path: 'logout', loadComponent: () => import('../app/admin/logout/logout.component').then(m => m.LogoutComponent) },
        // { path: '**', redirectTo: 'dashboard' }
           { path: 'admin',component:DashboardComponent}

      ];
      
