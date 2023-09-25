import { Component, OnInit } from '@angular/core';
import { EditProfileModalService } from '../edit-profile-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from './profile.service';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  profileImageUrl: string = ''; // Initialize with default image URL
  username: string = ''; // Initialize with default username
  bio: string = ''; // Initialize with default bio

  constructor(private dialog: MatDialog, private editProfileModalService: EditProfileModalService) {}
  

  
  editProfile() {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      data: {
        username: this.username,
        bio: this.bio,
        // ... other data you want to pass to the dialog
      },
    });

    // Subscribe to the dialog's afterClosed event to get the updated data
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the bio with the data from the dialog
        this.bio = result.bio;
        this.profileImageUrl = result.profileImageUrl; 
      }
    });
  }
  
  ngOnInit() {
    // Fetch profile data from a service or API
    this.fetchProfileData();
  }

  fetchProfileData() {
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

