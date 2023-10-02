import { Component } from '@angular/core';
import { UsernameService } from '../services/username.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  username: string = '';

  constructor(private usernameService: UsernameService) {}

  profileImageUrl = 'https://imgs.search.brave.com/7mgL6lpfwJgoZe9dMFbEXNFCM59HPoXPK2PnAcU98u0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pLzEwMDB4/MTAwMC8yMi8wNS9t/YWxlLXByb2ZpbGUt/cGljdHVyZS12ZWN0/b3ItMTg2MjIwNS5q/cGc'; 
  ngOnInit() {
    // Retrieve the username from the service
    this.usernameService.username$.subscribe((username) => {
      this.username = username;
    });
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameService.setUsername(storedUsername);
    }
  }
}
