import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent{
  hide = true;
  addStudentForm: FormGroup;
  loginMessage: string = '';
  loginMessageType: string = '';

  constructor(
    private formBuilder: FormBuilder,

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

  editErrors(inputs: any): boolean {
    if (inputs.value.trim().length < 1) {
      return true;
    }
    return false;
  }

  onSubmit() {
  }

}