import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendMessage(studentId: string, messageData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendMessage/${studentId}`, messageData);
  } 

  getMessagesForStudent(studentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${studentId}/messages`);
  }

  deleteMessage(messageId: string) {
    return this.http.delete(`${this.apiUrl}/deleteMessage/${messageId}`);
  }
}