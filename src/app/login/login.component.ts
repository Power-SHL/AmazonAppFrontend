import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Inject the Router service in the constructor
  constructor(private router: Router) { }

  // Create the onLogin method to handle button press
  onLogin() {
      // TODO: Add any login logic/validation here
      // If login is successful, navigate to the feed page
      this.router.navigate(['/feed']);
  }
}
