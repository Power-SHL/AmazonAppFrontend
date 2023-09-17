import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent {
  constructor(private dialogRef: MatDialogRef<EditProfileModalComponent>) {}
  selectedFileName: string | undefined;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
    }
  }
  onSave(): void {
    // Implement logic to save profile changes
    // Close the modal when done
    this.dialogRef.close();
  }

  onCancel(): void {
    // Implement logic to discard changes if needed
    // Close the modal
    this.dialogRef.close();
  }
  @Input() profileImageUrl: string = ''
  @Input() username: string = ''
  @Input() bio: string = ''
}
