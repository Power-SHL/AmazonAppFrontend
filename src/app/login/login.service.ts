// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://amazonappbackend.azurewebsites.net/api/profile';

  constructor(private http: HttpClient) { }

  login(usernameEmail: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { usernameEmail, password });
  }
}
