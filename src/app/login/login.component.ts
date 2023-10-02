import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UsernameService } from '../services/username.service';

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
    private loginService: LoginService,
    private usernameService: UsernameService
  ) {
    this.loginForm = this.fb.group({
      logInString: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { logInString, password } = this.loginForm.value;
      this.loginService.login(logInString, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.usernameService.setUsername(response.username);
          console.log(response.username)
          localStorage.setItem('username', response.username);
          localStorage.setItem('authtoken', response.token);
          console.log(response.token)
          this.router.navigate(['/feed']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
