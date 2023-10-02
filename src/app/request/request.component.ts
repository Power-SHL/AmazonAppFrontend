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
    const token = localStorage.getItem('authtoken'); 
    console.log(token);
    this.requestService.sendFriendRequests(this.sender, this.receiver, token).subscribe(
      (response: any) => {
        this.successMessage = response.message;
      },
      (error: any) => {
        this.errorMessage = error.error; 
      }
    );
  }
}
