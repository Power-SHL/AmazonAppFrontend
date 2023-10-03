import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
    private baseUrl = 'https://streamitbackend.azurewebsites.net/api/friends/requests';
  
    constructor(private http: HttpClient) { }
  
    request(username: string, authToken: string | null): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });

      const requestOptions = { headers: headers };

      return this.http.get(`${this.baseUrl}/${username}/received`, requestOptions);
    }
    sendFriendRequests(sender: string, receiver: string, authToken: string | null): Observable<any> {
        const request = { sender: sender, receiver: receiver };
        const url = 'https://streamitbackend.azurewebsites.net/api/friends/send'
        // Set the content type to JSON and include the Authorization header with the token
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        });
        const requestOptions = { headers: headers };

        return this.http.post(url, request, requestOptions);
    }
    acceptFriendRequest(sender: string, receiver: string | null, authToken: string | null): Observable<any> {
        const request = { Sender: sender, Receiver: receiver };
        const url = 'https://streamitbackend.azurewebsites.net/api/friends/accept'
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        });
    
        return this.http.post(url, request, { headers: headers });
      }
      getFriends(username: string, authToken: string | null): Observable<any[]> {
        const url = `https://streamitbackend.azurewebsites.net/api/friends/${username}`;
      
        // Set the Authorization header with the token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${authToken}`
        });
      
        const requestOptions = { headers: headers };
      
        return this.http.get<any[]>(url, requestOptions);
      }
      
}
