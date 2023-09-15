import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts = [
    { 
      imageUrl: 'https://imgs.search.brave.com/WztMOYMZM-EMbFyHhdcts04I2eSRVobVN1NeaqVgd5I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA5L1Nwb3RpZnkt/bG9nby5wbmc', 
      description: 'This is a test post 1.', 
      caption: 'Listen to this amazing song!' 
    },
    { 
      imageUrl: 'https://imgs.search.brave.com/EjRo_2RN14IcsfUCg3-UdxTCGDWpXMFJ5WHf4lfYP5U/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/c3RhdGljYWxseS5p/by9pbWcvcG5nZnJl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/dHdpdGNoLWxvZ28t/cG5nLWZyb20tcG5n/ZnJlLTE3LTEwMjR4/NjE5LnBuZz9xdWFs/aXR5PTEwMCZmPWF1/dG8', 
      description: 'This is a test post 2.',
      caption: 'Watch my Live Stream!' 
    },
    //... add as many dummy posts as you want for testing
  ];
}
