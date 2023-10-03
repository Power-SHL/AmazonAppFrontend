import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeedService } from './feed.service';
import { Post } from './post.interface';
import { UsernameService } from '../services/username.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private feedService: FeedService, 
    private usernameService: UsernameService
  ) { }

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
        this.posts = data.posts; // Adjust as needed based on the API response structure
      },
      error => {
        console.error('Error loading posts', error);
      }
    );
  }

  addPost(): void {
    const postRequest = {
      Username: localStorage.getItem('username'),
      ContentId: 'exampleContentId' 
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
