import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAnnouncements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/announcements`);
  }

  deleteAnnouncement(announcementId: string) {
    return this.http.delete(`${this.apiUrl}/deleteAnnouncement/${announcementId}`);
  }

  createAnnouncement(announcementData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAnnouncement`, announcementData);
  } 
}