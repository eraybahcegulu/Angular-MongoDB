import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
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
        this.handleLoginResponse(response);
      },
      (error) => {
        this.handleLoginError(error);
      }
    );
  }

  private handleLoginResponse(response: any): void {
    this.loginMessage = response.message;
    this.loginMessageType = 'success';
  }

  private handleLoginError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.loginMessage = 'Invalid email or password';
      this.loginForm.controls['password'].reset();
    } else {
      console.error('Login failed', error);
      this.loginMessage = 'Login failed';
    }
    this.loginMessageType = 'danger';


    setTimeout(() => {
      this.loginMessage = '';
      this.loginMessageType = '';
    }, 2000);
  }
}