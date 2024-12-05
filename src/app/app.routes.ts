import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddcourseComponent } from './admin/addcourse/addcourse.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { SitebarComponent } from './admin/sitebar/sitebar.component';
import { StudentsComponent } from './admin/students/students.component';
import { AdmindashboardComponent } from './admin/admindashboard.component';


export const routes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    // { path: 'home', component: HomeComponent },
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

];

