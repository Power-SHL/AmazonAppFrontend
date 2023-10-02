import { Component } from '@angular/core';
import { RequestService } from '../request/request.service';

@Component({
  selector: 'app-addfriendrequest',
  templateUrl: './addfriendrequest.component.html',
  styleUrls: ['./addfriendrequest.component.scss']
})
export class AddfriendrequestComponent {
  sender: string = '';
  receiver: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private requestService: RequestService) { }

  sendFriendRequest() {
    const token = localStorage.getItem('authtoken'); 
      console.log(token);
    this.requestService.sendFriendRequests(this.sender, this.receiver, token).subscribe(
      (response: any) => {
        // Handle success
        this.successMessage = response.message;
        // You can also update your friendRequests array here
      },
      (error: any) => {
        // Handle errors
        this.errorMessage = error.error; // Display error message from the backend
      }
    );
  }
}
