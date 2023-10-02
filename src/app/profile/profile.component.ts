import { Component, OnInit } from '@angular/core';
import { EditProfileModalService } from '../edit-profile-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from './profile.service';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { UsernameService } from '../services/username.service';
import { Profile } from './profile.model';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  profileImageUrl: string = ''; // Initialize with default image URL
  firstname: string = ''; 
  lastname: string = '';
  username: string | undefined;
  constructor(private dialog: MatDialog, private editProfileModalService: EditProfileModalService, private usernameService: UsernameService, private profileService: ProfileService) {}
  

  
  editProfile() {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      data: {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        image: this.profileImageUrl
      },
    });

    // Subscribe to the dialog's afterClosed event to get the updated data
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firstname = result.firstname;
        this.lastname = result.lastname;
        this.profileImageUrl = result.profileImageUrl; 
      }
    });
  }
  
  ngOnInit() {
    // Fetch profile data from a service or API
    this.fetchProfileData();
    this.usernameService.username$.subscribe((username) => {
      console.log('Received username:', username);
      this.username = username;
      this.profileService.getProfile(username).subscribe((data: Profile) => {
        this.firstname = data.firstName;
        this.lastname = data.lastName;
      });      
    });
   
  }

  fetchProfileData() {
    this.username = 'YourUsername';
  }
  updateProfile(updatedData: {firstname: string, lastname:string, profileImageUrl: string }) {
    this.firstname = updatedData.firstname;
    this.lastname = updatedData.lastname;
    this.profileImageUrl = updatedData.profileImageUrl;
  }

  updateProfileData() {
    const updatedProfile = {
      firstName: this.firstname,
      lastName: this.lastname
    };
    const token = localStorage.getItem('authtoken'); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header.
      })
    };
    if (this.username) {
      this.profileService.updateProfileBio(this.username, updatedProfile, httpOptions).subscribe(
        (response) => {
          console.log('Profile updated successfully', response);
          // Handle success, if needed
        },
        (error) => {
          console.error('Profile update failed', error);
          // Handle errors, if needed
        }
      );
    }
  }

  // ...
}
  

