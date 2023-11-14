import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerSendMessageService {
  handleSendMessageResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleSendMessageError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
      return {
        message: error.error.message,
        type: 'danger',
      };
    } else {
      console.error('Send message failed', error);
      return {
        message: 'Send message failed',
        type: 'danger',
      };
    }
  }
}