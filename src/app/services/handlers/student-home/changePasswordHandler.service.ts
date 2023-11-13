import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerChangePasswordService {
  handleChangePasswordResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleChangePasswordError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
        return {
            message: error.error.message,
          type: 'danger',
        };
      } else {
        console.error('Password change failed', error);
        return {
          message: 'Password change failed',
          type: 'danger',
        };
      }
    }
}