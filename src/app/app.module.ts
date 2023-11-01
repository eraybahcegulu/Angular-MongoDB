import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/teacher-dashboard/students/students.component';
import { TeacherBarComponent } from './components/teacher-dashboard/shared/teacher-bar/teacher-bar.component';
import { AddStudentComponent } from './components/teacher-dashboard/add-student/add-student.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    TeacherBarComponent,
    AddStudentComponent,
    StudentHomeComponent,
    LoginComponent,
    TeacherDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
