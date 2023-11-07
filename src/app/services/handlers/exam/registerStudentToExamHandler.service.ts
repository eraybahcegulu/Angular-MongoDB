import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerRegisterStudentToExamService {
  handleRegisterStudentToExamResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleRegisterStudentToExamError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
      return {
        message: error.error.message,
        type: 'danger',
      };
    } else {
      console.error('Student register to exam failed', error);
      return {
        message: 'Student register to exam failed',
        type: 'danger',
      };
    }
  }
}