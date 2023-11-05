import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { HandlerAddStudentService } from '../../../services/handlers/student/addStudentHandler.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent{

  addStudentForm: FormGroup;
  addStudentMessage: string = '';
  addStudentMessageType: string = '';

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private handlerAddStudentService: HandlerAddStudentService
  ) {

    this.addStudentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3),]],
      surname: ['', [Validators.required, Validators.minLength(3),]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), ]],
      no: ['', [      Validators.required, Validators.required, Validators.pattern('^[0-9]{3,15}$'),]], 
      password: ['', [Validators.required, Validators.minLength(6),]]
    });
  }
  get formControls() {
    return this.addStudentForm.controls;
  }

  addStudent() {
    if (this.addStudentForm.invalid) {
      return;
    }

    const studentData = {
      name: this.addStudentForm.controls['name'].value,
      surname: this.addStudentForm.controls['surname'].value,
      email: this.addStudentForm.controls['email'].value,
      no: this.addStudentForm.controls['no'].value,
      password: this.addStudentForm.controls['password'].value,
    };

    this.studentService.addStudent(studentData).subscribe(
      (response) => {
        const addStudentResponse = this.handlerAddStudentService.handleAddStudentResponse(response);
        this.addStudentMessage = addStudentResponse.message;
        this.addStudentMessageType = addStudentResponse.type;
        setTimeout(() => {
          this.addStudentMessage = '';
          this.addStudentMessageType = '';
        }, 3000);
      },
      (error) => {
        const addStudentError = this.handlerAddStudentService.handleAddStudentError(error);
        this.addStudentMessage = addStudentError.message;
        this.addStudentMessageType = addStudentError.type;
        setTimeout(() => {
          this.addStudentMessage = '';
          this.addStudentMessageType = '';
        }, 3000);
      }
    );
  }

  editErrors(inputs: any): boolean {
    if (inputs.value.trim().length < 1) {
      return true;
    }
    return false;
  }
}