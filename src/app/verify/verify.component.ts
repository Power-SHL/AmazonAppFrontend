import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyService } from './verify.service'; // Adjust the path as needed

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  verifyForm: FormGroup;

  constructor(private fb: FormBuilder, private verifyService: VerifyService) {
    this.verifyForm = this.fb.group({
      username: ['', Validators.required],
      verificationCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      const { username, verificationCode } = this.verifyForm.value;
      this.verifyService.verifyProfile(username.toLowerCase(), verificationCode).subscribe(
        response => {
          console.log('Profile verified', response);
          // Handle success, navigate to another page or show a success message
        },
        error => {
          console.error('Error verifying profile', error);
          // Handle error, show error message to the user
        }
      );
    }
  }
}
