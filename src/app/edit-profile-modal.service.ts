// edit-profile-modal.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EditProfileModalService {
  constructor(private dialog: MatDialog) {}

  openEditProfileModal(): void {
    this.dialog.open(EditProfileModalComponent, {
      width: '400px', // Set the desired width for the modal
    });
  }
}
