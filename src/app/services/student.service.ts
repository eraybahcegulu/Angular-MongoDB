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

  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addStudent`, studentData);
  } 

  deleteStudent(studentId: string) {
    return this.http.delete(`${this.apiUrl}/deleteStudent/${studentId}`);
  }

  sendMessage(studentId: string, messageData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendMessage/${studentId}`, messageData);
  } 

  updateStudent(studentId: string, updatedStudentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStudent/${studentId}`, updatedStudentData);
  }

  getMessagesForStudent(studentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${studentId}/messages`);
  }

  deleteMessage(messageId: string) {
    return this.http.delete(`${this.apiUrl}/deleteMessage/${messageId}`);
  }
}