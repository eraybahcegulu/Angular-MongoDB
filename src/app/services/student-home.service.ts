import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentHomeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getStudentInfos(studentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${studentId}/infos`);
  }

  changePassword(studentId: string, newPassword: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/changePassword/${studentId}`, newPassword);
  }
}