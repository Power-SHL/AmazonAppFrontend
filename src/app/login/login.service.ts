// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://streamitbackend.azurewebsites.net/api/profile/login';
  
  constructor(private http: HttpClient) { }

  login(logInString: string, password: string): Observable<any> {
    //const url = `${this.baseUrl}/${usernameEmail}/login`;
    return this.http.post(this.baseUrl, { logInString, password });
  }
}
