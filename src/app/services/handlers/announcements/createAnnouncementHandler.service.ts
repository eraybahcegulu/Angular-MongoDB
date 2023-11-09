import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandlerCreateAnnouncementService {
  handleCreateAnnouncementResponse(response: any): { message: string, type: string } {
    return {
      message: response.message,
      type: 'success',
    };
  }

  handleCreateAnnouncementError(error: HttpErrorResponse): { message: string, type: string } {
    if (error.status === 400) {
      return {
        message: error.error.message,
        type: 'danger',
      };
    } else {
      console.error('Announcement creating failed', error);
      return {
        message: 'Announcement creating failed',
        type: 'danger',
      };
    }
  }
}