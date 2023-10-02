import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UsernameService } from '../services/username.service';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileService } from '../profile/profile.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  constructor(private dialogRef: MatDialogRef<EditProfileModalComponent>,  private httpClient: HttpClient, private usernameService: UsernameService, private profileService: ProfileService) {}

  selectedFileName: string | undefined;
  profileImage: File | undefined;
  @Input() username: string = ''; // Receive the username as an input
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.profileImage = file;
    }
  }
  uploadProfileImage() {
    if (this.profileImage) {
      const formData = new FormData();
      formData.append('image', this.profileImage);
      this.usernameService.username$.subscribe((username) => {this.username = username;});

      const authToken = localStorage.getItem('authtoken'); // Example: Fetch it from local storage

      // Ensure you have the token before making the request
      if (authToken) {
        const headers = {
          Authorization: `Bearer ${authToken}` // Include the token in the Authorization header
        };

        const url = `https://streamitbackend.azurewebsites.net/api/images/${this.username}`;

        // Add the headers to the HTTP request
        this.httpClient.post<any>(url, formData, { headers }).subscribe(
        (response: { imageUrl: any; }) => {
          // Handle the response, which may include the image URL
          const imageUrl = response.imageUrl;
          // Emit the event with the new image URL
          this.profileUpdated.emit(imageUrl);
        },
        (error: any) => {
          // Handle errors: display an error message to the user
          console.error('Image upload failed:', error);
        }
      );
    } else {
      console.error('Authentication token not found.');
    }
    }
  }
  

  
  onSave() {
    const token = localStorage.getItem('authtoken'); 
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header.
      })
    };
    this.uploadProfileImage();
    const updatedProfile = {
      firstName: this.firstname,
      lastName: this.lastname
    };
    
    this.profileService.updateProfileBio(this.username, updatedProfile,  httpOptions).subscribe(
      () => {
        // Handle success, if needed
        this.profileUpdated.emit({
          firstname: this.firstname,
          lastname: this.lastname,
          profileImageUrl: this.profileImageUrl
        });
        this.dialogRef.close({
          firstname: this.firstname,
          lastname: this.lastname
        });
      },
      (error) => {
        console.error('Profile update failed', error);
        // Handle errors, if needed
      }
    );
    this.dialogRef.close
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  @Input() profileImageUrl: string = ''
  @Input() firstname: string = ''; // Add firstname input
  @Input() lastname: string = ''; // Add lastname input
  @Output() profileUpdated = new EventEmitter<{ firstname: string, lastname: string, profileImageUrl: string }>();
 

}
