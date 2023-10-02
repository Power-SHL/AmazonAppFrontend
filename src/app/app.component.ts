import { Component, ViewChild } from '@angular/core';
import { AddfriendrequestComponent } from './addfriendrequest/addfriendrequest.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StreamIt';

  @ViewChild(AddfriendrequestComponent) addFriendComponent!: AddfriendrequestComponent;

  onAddFriendClicked() {
    this.addFriendComponent.sendFriendRequest();
  }
}
