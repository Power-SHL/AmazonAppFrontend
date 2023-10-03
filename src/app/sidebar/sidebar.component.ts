import { Component } from '@angular/core';
import { UsernameService } from '../services/username.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  username: string = '';

  constructor(private usernameService: UsernameService,private router: Router) {}

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
  logout() {
    // Clear user data from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('authtoken');

    // Redirect to the home page 
    this.router.navigate(['']); 
  }
}
