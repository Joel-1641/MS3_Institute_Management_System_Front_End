import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddcourseComponent } from './admin/addcourse/addcourse.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { holdReady } from 'jquery';
import { SitebarComponent } from './admin/sitebar/sitebar.component';


export const routes: Routes = [
    { path: '**', component: HomeComponent },
    { path: '', component: HomeComponent },
    // {path:'register' , component:SignupPageComponent},
    // {path:'login' , component:LoginPageComponent},


    {path: 'admin', component: SitebarComponent,
    //     canActivate:[AuthGuard],
    children: [
        { path: 'add-course', component: AddcourseComponent },
        { path: 'analytics', component: AnalyticsComponent },
        { path: 'courses', component: CoursesComponent },


    ]
        }

];

