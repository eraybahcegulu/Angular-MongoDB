import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerDeleteStudentService {
  handleDeleteStudentResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleDeleteStudentError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
      return {
        message: error.error.message,
        type: 'danger',
      };
    } else {
      console.error('Student delete failed', error);
      return {
        message: 'Student delete failed',
        type: 'danger',
      };
    }
  }
}