import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { StudentsComponent } from './Components/students/students.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { StudentDetailsComponent } from './Components/student-details/student-details.component';

const routes: Routes = [
  {path:'', redirectTo:"students", pathMatch: "full" },
  {path:'students', component: StudentsComponent },
  {path:'addstudent', component: AddStudentComponent },
  {path:'students/:id', component: StudentDetailsComponent },
  {path:'update/:id', component: AddStudentComponent },
  {path:'**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
