import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerDeleteExamService {
  handleDeleteExamResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleDeleteExamError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
      return {
        message: error.error.message,
        type: 'danger',
      };
    } else {
      console.error('Exam delete failed', error);
      return {
        message: 'Exam delete failed',
        type: 'danger',
      };
    }
  }
}