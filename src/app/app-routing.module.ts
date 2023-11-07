import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { ViewStudentsComponent } from './components/teacher-dashboard/view-students/view-students.component';
import { CreateExamComponent } from './components/teacher-dashboard/create-exam/create-exam.component';
import { AddStudentComponent } from './components/teacher-dashboard/add-student/add-student.component';
import { AuthGuardService } from './services/authguard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student-home', component: StudentHomeComponent, canActivate: [AuthGuardService], data: { roles: ['student'] } },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuardService], data: { roles: ['teacher'] } },
  { path: 'view-students', component: ViewStudentsComponent, canActivate: [AuthGuardService], data: { roles: ['teacher'] } },
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuardService], data: { roles: ['teacher'] } },
  { path: 'create-exam', component: CreateExamComponent, canActivate: [AuthGuardService], data: { roles: ['teacher'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
