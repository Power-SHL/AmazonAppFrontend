import { Component } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {
  friendRequests: any[] = [
    { fromUser: 'user234' },
    { fromUser: 'user789' },
    // Add more friend request objects here
  ];
  activityNotifications: any[] = [
    { fromUser: 'user56', activity: 'started following you' },
    { fromUser: 'user578', activity: 'started following you' },
    // Add more activity notification objects here
  ];
}
