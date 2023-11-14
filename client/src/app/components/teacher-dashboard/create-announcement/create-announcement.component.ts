import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../../../services/announcement.service';
import { HandlerCreateAnnouncementService } from '../../../services/handlers/announcements/createAnnouncementHandler.service';
import { HandlerDeleteAnnouncementService } from '../../../services/handlers/announcements/deleteAnnouncement.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {

  createAnnouncementMessage: string = '';
  createAnnouncementMessageType: string = '';

  deleteAnnouncementMessage: string = '';
  deleteAnnouncementMessageType: string = '';

  announcements: any[] = [];

  createAnnouncementForm: FormGroup;
  constructor(
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder,
    private handlerCreateAnnouncementService: HandlerCreateAnnouncementService,
    private handlerDeleteAnnouncementService: HandlerDeleteAnnouncementService,
  ) {

    this.createAnnouncementForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),]],
      announcement: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
    });
  }

  get formControls() {
    return this.createAnnouncementForm.controls;
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements() {
    this.announcementService.getAnnouncements().subscribe((announcements: any[]) => {
      this.announcements = announcements;
    });
  }

  createAnnouncement() {
    if (this.createAnnouncementForm.invalid) {
      return;
    }

    const announcementData = {
      title: this.createAnnouncementForm.controls['title'].value,
      announcement: this.createAnnouncementForm.controls['announcement'].value,
    };

    this.announcementService.createAnnouncement(announcementData).subscribe(
      (response) => {
        const createAnnouncementResponse = this.handlerCreateAnnouncementService.handleCreateAnnouncementResponse(response);
        this.createAnnouncementMessage = createAnnouncementResponse.message;
        this.createAnnouncementMessageType = createAnnouncementResponse.type;
        setTimeout(() => {
          this.createAnnouncementMessage = '';
          this.createAnnouncementMessageType = '';
        }, 3000);
        this.createAnnouncementForm.reset();
        this.getAnnouncements();
      },
      (error) => {
        const createExamError = this.handlerCreateAnnouncementService.handleCreateAnnouncementError(error);
        this.createAnnouncementMessage = createExamError.message;
        this.createAnnouncementMessageType = createExamError.type;
        setTimeout(() => {
          this.createAnnouncementMessage = '';
          this.createAnnouncementMessageType = '';
        }, 3000);
      }
    );
  }

  deleteAnnouncement(announcementId: any) {
    this.announcementService.deleteAnnouncement(announcementId).subscribe(
      () => {
        this.getAnnouncements()
      },
      (error) => {
        this.getAnnouncements()
        const deleteAnnouncementError = this.handlerDeleteAnnouncementService.handleDeleteAnnouncementError(error);
        this.deleteAnnouncementMessage = deleteAnnouncementError.message;
        this.deleteAnnouncementMessageType = deleteAnnouncementError.type;
        setTimeout(() => {
          this.deleteAnnouncementMessage = '';
          this.deleteAnnouncementMessageType = '';
        }, 3000);
      }
    )
  }

  editErrors(inputs: any): boolean {
    if (inputs.value.trim().length < 3) {
      return true;
    }
    return false;
  }

}
