import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/teacher/students/students.component';
import { TeacherBarComponent } from './components/teacher/shared/teacher-bar/teacher-bar.component';
import { AddStudentComponent } from './components/teacher/add-student/add-student.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    TeacherBarComponent,
    AddStudentComponent,
    StudentHomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
