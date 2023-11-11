import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  getExamsForSelectedStudent(studentNo: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${studentNo}/exams`);
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addStudent`, studentData);
  } 

  deleteStudent(studentId: string) {
    return this.http.delete(`${this.apiUrl}/deleteStudent/${studentId}`);
  }
  
  updateStudent(studentId: string, updatedStudentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStudent/${studentId}`, updatedStudentData);
  }

}