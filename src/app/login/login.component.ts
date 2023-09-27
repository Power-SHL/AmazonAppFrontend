import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      usernameEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { usernameEmail, password } = this.loginForm.value;
      this.loginService.login(usernameEmail, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/feed']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
