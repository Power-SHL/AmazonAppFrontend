import { Component, Output, EventEmitter } from '@angular/core';
import { RequestService } from './request.service';
import { UsernameService } from '../services/username.service';
import { catchError, of } from 'rxjs';
import { AddfriendrequestComponent } from '../addfriendrequest/addfriendrequest.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {

  friendRequests: any[] = [];
  constructor(private requestService: RequestService, private usernameService:UsernameService ) { }
  friendRequestsNotFound: boolean = false;
  friends: any[] = []; // Initialize as empty array

  ngOnInit() {
    this.usernameService.username$.subscribe((username) => {
      const token = localStorage.getItem('authtoken'); 
      console.log(token);
      console.log('Received username:', username);
      this.requestService.request(username, token).pipe(
        catchError(error => {
          if (error.status === 404) {
            console.error('Friend requests not found for user', username);
            this.friendRequestsNotFound = true;
          } else {
            console.error('An error occurred:', error);
          }
          return of([]); 
        })
      ).subscribe((data: any) => {
      this.friendRequests = data;
    });
    this.requestService.getFriends(username, token).subscribe(
      (data: any) => {
        this.friends = data;
      },
      (error: any) => {
        console.error('An error occurred while fetching friends:', error);
      }
    );
  });
}
  sender: string = '';
  receiver: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  sendFriendRequest() {
    this.usernameService.username$.subscribe((sender) => {
    const token = localStorage.getItem('authtoken'); 
    console.log(token);
    this.requestService.sendFriendRequests(sender, this.receiver, token).subscribe(
      (response: any) => {
        this.receiver = '';
        // Handle success
        console.log('Request sent successfully:', response);
        // You can also update your friendRequests array here
      },
      (error: any) => {
        // Handle errors
        console.error('Error sending friend request:', error);
        // You can show an error message or perform other actions here
      }
    );
  });
}
acceptFriendRequest(request: any) {
  // Assuming you have the sender's and receiver's usernames
  const sender = request.sender;
  const receiver =  localStorage.getItem('username')
  const token = localStorage.getItem('authtoken');

  this.requestService.acceptFriendRequest(sender, receiver, token).subscribe((response: any) => {
      this.successMessage = response.message;
      this.friendRequests = this.friendRequests.filter(req => req !== request);
    }, );
    window.location.reload();
}

rejectFriendRequest(request: any) {
  this.friendRequests = this.friendRequests.filter(req => req !== request);
}
}
