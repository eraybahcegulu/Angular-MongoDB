import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerService {
  handleLoginResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleLoginError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 401) {
      return {
        message: error.error.message,
        type: 'danger',
      };
    } else {
      console.error('Login failed', error);
      return {
        message: 'Login failed',
        type: 'danger',
      };
    }
  }
}