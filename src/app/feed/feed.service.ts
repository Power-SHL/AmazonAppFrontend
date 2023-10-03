import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private baseUrl = 'https://streamitbackend.azurewebsites.net/api/feed'; 

  constructor(private http: HttpClient) { }

  getPostsOfFriends(username: string, pageNumber: number, pageSize: number, authToken: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    const requestOptions = { headers: headers };

    return this.http.get(`${this.baseUrl}?username=${username}&pageNumber=${pageNumber}&pageSize=${pageSize}`, requestOptions);
  }

  addPost(postRequest: any, authToken: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.baseUrl}/spotify`, postRequest, { headers });
  }

  deletePost(deletePostRequest: any, authToken: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.delete(`${this.baseUrl}`, { headers, body: deletePostRequest });
  }
}
