import { Component } from '@angular/core';
import { EditProfileModalService } from '../edit-profile-modal.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileImageUrl: string = ''; // Initialize with default image URL
  username: string = ''; // Initialize with default username
  bio: string = ''; // Initialize with default bio

  constructor(private editProfileModalService: EditProfileModalService, private dialog: MatDialog) {}

  editProfile(): void {
    this.editProfileModalService.openEditProfileModal();
  }
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
  updateProfile(updatedData: { username: string, bio: string, profileImageUrl: string }) {
    this.username = updatedData.username;
    this.bio = updatedData.bio;
    this.profileImageUrl = updatedData.profileImageUrl;
  }
  

}

