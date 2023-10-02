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
    this.requestService.sendFriendRequests(sender, this.receiver, token)
  });
}
acceptFriendRequest(request: any) {
  // Assuming you have the sender's and receiver's usernames
  const sender = request.sender;
  const receiver =  localStorage.getItem('username')
  const token = localStorage.getItem('authtoken');

  this.requestService.acceptFriendRequest(sender, receiver, token)
}

rejectFriendRequest(request: any) {
  this.friendRequests = this.friendRequests.filter(req => req !== request);
}
}
