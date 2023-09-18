import { Component, Input, EventEmitter, Output } from '@angular/core';
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
  onSave() {
    this.profileUpdated.emit({ username: this.username, bio: this.bio, profileImageUrl: this.profileImageUrl });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  @Input() profileImageUrl: string = ''
  @Input() username: string = ''
  @Input() bio: string = ''

  @Output() profileUpdated = new EventEmitter<{ username: string, bio: string, profileImageUrl: string }>();
}
