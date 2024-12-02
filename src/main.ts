import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth/interceptor.service';
import { AuthenticationService } from './app/services/auth/authentication.service';
import { AuthGuard } from './app/auth/auth-guard.guard'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';



// Define routes for your application
const routes: Routes = [    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./app/admin/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
    { path: 'analytics', loadComponent: () => import('./app/admin/analytics/analytics.component').then(m => m.AnalyticsComponent) },
    { path: 'students', loadComponent: () => import('./app/admin/students/students.component').then(m => m.StudentsComponent) },
    { path: 'courses', loadComponent: () => import('./app/admin/courses/courses.component').then(m => m.CoursesComponent) },
    { path: 'logout', loadComponent: () => import('./app/admin/logout/logout.component').then(m => m.LogoutComponent) },
    { path: '**', redirectTo: 'dashboard' }
  ];

// Bootstrap the application with the router and authentication service
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    HttpClientModule,
    AuthenticationService,  // Register the AuthenticationService
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
}).catch(err => console.error(err));
