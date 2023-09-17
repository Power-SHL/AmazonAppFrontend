import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileImageUrl: string = ''; // Initialize with default image URL
  username: string = ''; // Initialize with default username
  bio: string = ''; // Initialize with default bio

  constructor() {}

  ngOnInit() {
    // Fetch profile data from a service or API
    this.fetchProfileData();
  }

  fetchProfileData() {
    // Simulate fetching profile data from an API
    // Replace this with your actual data fetching logic
    this.profileImageUrl = '../assets/user1.jpeg';
    this.username = 'YourUsername';
    this.bio = 'Your Bio';
  }

  editProfile() {
    // Implement logic to navigate to the profile editing page
    // For example, you can use Angular's Router to navigate
    // to a separate edit profile component.
  }
}

