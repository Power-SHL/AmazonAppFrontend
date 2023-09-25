import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  constructor(private dialogRef: MatDialogRef<EditProfileModalComponent>,  private httpClient: HttpClient) {}

  selectedFileName: string | undefined;
  profileImage: File | undefined;
  
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
  
      this.httpClient.post<any>('https://streamitbackend.azurewebsites.net/api/UploadImage', formData).subscribe(
        (response: { imageUrl: any; }) => {
          // Handle the response, which may include the image URL
          const imageUrl = response.imageUrl;
          // Emit the event with the new image URL
          this.profileUpdated.emit(imageUrl);
        },
        (error: any) => {
          // Handle errors, e.g., display an error message to the user
          console.error('Image upload failed:', error);
        }
      );
    }
  }
  
  onSave() {
    this.uploadProfileImage();
    this.profileUpdated.emit({ username: this.username, bio: this.bio, profileImageUrl: this.profileImageUrl });
    this.dialogRef.close({ bio: this.bio });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  @Input() profileImageUrl: string = ''
  @Input() username: string = ''
  @Input() bio: string = ''

  @Output() profileUpdated = new EventEmitter<{ username: string, bio: string, profileImageUrl: string }>();
 

}
