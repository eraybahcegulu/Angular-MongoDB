import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewStudentsComponent } from './components/teacher-dashboard/view-students/view-students.component';
import { AddStudentComponent } from './components/teacher-dashboard/add-student/add-student.component';
import { CreateExamComponent } from './components/teacher-dashboard/create-exam/create-exam.component';
import { CreateAnnouncementComponent } from './components/teacher-dashboard/create-announcement/create-announcement.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    ViewStudentsComponent,
    AddStudentComponent,
    StudentHomeComponent,
    LoginComponent,
    TeacherDashboardComponent,
    CreateExamComponent,
    CreateAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
