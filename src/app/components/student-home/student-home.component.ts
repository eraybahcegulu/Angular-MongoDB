import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudentHomeService } from '../../../app/services/student-home.service';
import { AnnouncementService } from '../../../app/services/announcement.service';
import { StudentService } from '../../../app/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HandlerChangePasswordService } from '../../services/handlers/student-home/changePasswordHandler.service';
declare var $: any;
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
  providers: [NgbPopoverConfig]
})
export class StudentHomeComponent {
  userInfo: any;
  myInfos: any;
  announcements: any;
  myExams: any;

  changePasswordForm: FormGroup;

  changePasswordMessage: string = '';
  changePasswordMessageType: string = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private studentHomeService: StudentHomeService,
    private announcementService: AnnouncementService,
    private handlerChangePasswordService: HandlerChangePasswordService,
    config: NgbPopoverConfig
  ) {

    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6),]],
    });


    config.placement = 'end';
    config.triggers = 'hover';

    config.popperOptions = (options) => {
      for (const modifier of options.modifiers || []) {
        if (modifier.name === 'offset' && modifier.options) {
          modifier.options['offset'] = () => [0, 8];
        }
      }
      return options;
    };
  }


  get formControls() {
    return this.changePasswordForm.controls;
  }



  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo: any) => {
        this.userInfo = userInfo;
        this.getMyInfos();
        this.getAnnouncements();
      }
    );
  }

  getMyInfos() {
    this.studentHomeService.getStudentInfos(this.userInfo._id).subscribe(
      (myInfos: any) => {
        this.myInfos = myInfos;
        this.getExamsForSelectedStudent();
      }
    );
  }

  getExamsForSelectedStudent() {
    this.studentService.getExamsForSelectedStudent(this.myInfos.no).subscribe((exams: any[]) => {
      this.myExams = exams;
    });
  }

  getAnnouncements() {
    this.announcementService.getAnnouncements().subscribe((announcements: any[]) => {
      this.announcements = announcements;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  changePassword() {
    const newPassword = {
      password: this.changePasswordForm.controls['password'].value,
    };
    this.ngOnInit();

    this.studentHomeService.changePassword(this.myInfos._id, newPassword).subscribe(
      (response) => {
        $('#changePasswordModal').modal('hide');
        this.changePasswordForm.reset();
        const changePasswordResponse = this.handlerChangePasswordService.handleChangePasswordResponse(response);
        this.changePasswordMessage = changePasswordResponse.message;
        this.changePasswordMessageType = changePasswordResponse.type;
        setTimeout(() => {
          this.changePasswordMessage = '';
          this.changePasswordMessageType = '';
        }, 3000);
      },
      (error) => {
        $('#changePasswordModal').modal('hide');
        this.changePasswordForm.reset();
        const addStudentError = this.handlerChangePasswordService.handleChangePasswordError(error);
        this.changePasswordMessage = addStudentError.message;
        this.changePasswordMessageType = addStudentError.type;
        setTimeout(() => {
          this.changePasswordMessage = '';
          this.changePasswordMessageType = '';
        }, 3000);
      }
    );
  }

  editErrors(inputs: any): boolean {
    if (inputs.value.trim().length < 6) {
      return true;
    }
    return false;
  }


}
