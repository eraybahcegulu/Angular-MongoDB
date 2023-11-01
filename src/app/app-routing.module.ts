import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { TeacherDashboardComponent } from './components//teacher-dashboard/teacher-dashboard.component';
import { AuthGuardService } from './services/authguard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'student-home', component: StudentHomeComponent, canActivate: [AuthGuardService], data: { roles: ['student'] } },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuardService], data: { roles: ['teacher'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
