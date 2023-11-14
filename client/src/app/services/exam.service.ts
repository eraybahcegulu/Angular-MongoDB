import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getExams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams`);
  }

  createExam(examData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createExam`, examData);
  } 

  getStudentsForSelectedExam(examId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/exams/${examId}/students`);
  }

  deleteExam(examId: string) {
    return this.http.delete(`${this.apiUrl}/deleteExam/${examId}`);
  }

  registerStudentToExam(examId: string, studentNoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerStudentToExam/${examId}`, studentNoData);
  } 

  removeRegisteredStudent(selectedExamId: string, studentNo: number) {
    return this.http.delete(`${this.apiUrl}/removeRegisteredStudent/${selectedExamId}/${studentNo}`);
  }

  updateStudentScore(selectedExamId: string, studentId: string, updatedScoreData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStudentScore/${selectedExamId}/${studentId}`, updatedScoreData);
  }
}