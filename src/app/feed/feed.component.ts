import { Component, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeedService } from './feed.service';
import { Post } from './post.interface';
import { UsernameService } from '../services/username.service';
declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

type IFrameAPI = {
  createController: (
    element: HTMLElement,
    options: {
      width: string;
      height: string;
      uri: string;
    },
    callback: (EmbedController: any) => void
  ) => void;
};

type EmbedController = {
  loadUri: (uri: string) => void;
};


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy,AfterViewInit {
  ngAfterViewInit() {
    setTimeout(() => {
      // Initialize Spotify SDK here
    }, 0);
  }
  posts: Post[] = [];
  private unsubscribe$ = new Subject<void>();
  spotifyLink: string = ''; // New property for the Spotify l

  constructor(
    private feedService: FeedService, 
    private usernameService: UsernameService
  ) { }
extractContentIdFromSpotifyLink(link: string): string | null {
      const match = link.match(/https:\/\/spotify\.link\/(\w+)/);
      return match ? match[1] : null;
  }


  ngOnInit(): void {
    this.usernameService.username$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(username => {
        if (username) {
          const token = localStorage.getItem('authtoken');
          this.loadPosts(username, token);
        }
      });
  }

  loadPosts(username: string, token: string | null): void {
    const pageNumber = 1;
    const pageSize = 12;

    this.feedService.getPostsOfFriends(username, pageNumber, pageSize, token).subscribe(
      data => {
        this.posts = data.posts; 
        this.posts.forEach(post => console.log(post))
        this.posts.forEach(post => this.loadSpotifyTrack(post))
      },
      error => {
        console.error('Error loading posts', error);
      }
    );
  }

  loadSpotifyTrack(post: Post): void {
    console.log(post.contentId);
    document.addEventListener('DOMContentLoaded', () => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      console.log('Spotify SDK is ready.');
      const element = document.getElementById( `embed-iframe-${post.contentId} `);
      console.log(element)
      const options = {
        width: '50%',
        height: '300',
        uri: 'spotify:track:' + post.contentId
      };
      const callback = (EmbedController: { loadUri: (arg0: any) => void; }) => {
        document.querySelectorAll('.track').forEach(
          track => {
            track.addEventListener('click', () => {
              EmbedController.loadUri(post.contentId)
            });
          })
      };
      IFrameAPI.createController(element, options, callback);
    };
    });
  
  }

  


  addPost(): void {
    const contentId = this.extractContentIdFromSpotifyLink(this.spotifyLink);
    if (!contentId) {
      console.error('Invalid Spotify link');
      return;
    }

    const postRequest = {
      Username: localStorage.getItem('username'),
      ContentId: contentId
    };
    const token = localStorage.getItem('authtoken');

    this.feedService.addPost(postRequest, token).subscribe(
      post => {
        this.posts.push(post);
      },
      error => {
        console.error('Error adding post', error);
      }
    );


  }

  deletePost(username: string, platform: string): void {
    const deletePostRequest = {
      Username: username,
      Platform: platform
    };
    const token = localStorage.getItem('authtoken');

    this.feedService.deletePost(deletePostRequest, token).subscribe(
      () => {
        this.posts = this.posts.filter(post => post.username !== username && post.platform !== platform);
      },
      error => {
        console.error('Error deleting post', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
