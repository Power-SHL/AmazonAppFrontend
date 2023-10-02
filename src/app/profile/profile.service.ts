import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './profile.model';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'https://streamitbackend.azurewebsites.net/api/profile'; 

  constructor(private http: HttpClient) {}
  
  updateProfileBio(username: string | undefined, updatedProfile: { firstName: string; lastName: string }): Observable<any> {
      return this.http.put(`${this.baseUrl}/${username}`,  updatedProfile);
  }
  getProfile(username: string): Observable<Profile> {    
    console.log(username)
    return this.http.get<Profile>(`${this.baseUrl}/${username}`);
  }
}
