// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'https://https://streamitbackend.azurewebsites.net/api/profile'; 

  constructor(private http: HttpClient) {}

  updateProfileBio(username: string, bio: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${username}`, { bio });
  }
}
