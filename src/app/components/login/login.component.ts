import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HandlerService } from '../../services/handlers/loginHandler.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  loginMessage: string = '';
  loginMessageType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private handlerService: HandlerService,

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.authService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).subscribe(
      (response) => {
        const loginResponse = this.handlerService.handleLoginResponse(response);
        this.loginMessage = loginResponse.message;
        this.loginMessageType = loginResponse.type;
      },
      (error) => {
        const loginError = this.handlerService.handleLoginError(error);
        this.loginMessage = loginError.message;
        this.loginMessageType = loginError.type;
        this.loginForm.controls['password'].reset();
  
        setTimeout(() => {
          this.loginMessage = '';
          this.loginMessageType = '';
        }, 3000);
      }
    );
  }
}