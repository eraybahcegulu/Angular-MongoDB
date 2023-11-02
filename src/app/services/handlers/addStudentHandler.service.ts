import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerService {
  handleAddStudentResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleAddStudentError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
      return {
        message: 'This Student No is already registered.',
        type: 'danger',
      };
    } else {
      console.error('Student add failed', error);
      return {
        message: 'Student add failed',
        type: 'danger',
      };
    }
  }
}