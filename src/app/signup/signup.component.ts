// signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './signup.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-z]*')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Submitting form', this.signupForm.value);
    if (this.signupForm.valid) {
        const profile = this.signupForm.value;
        profile.username = profile.username.toLowerCase();
        this.apiService.createProfile(profile).subscribe(
            response => {
                console.log('Profile created', response);
                // Navigate to verification page after successful signup
                this.router.navigate(['/verify']); // Adjust the path as needed
            },
            error => {
                console.error('Error creating profile', error);
                // Handle error, show error message to the user
            }
        );
    }
  }
}
