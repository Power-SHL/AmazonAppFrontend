import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private apiUrl = 'https://streamitbackend.azurewebsites.net'; // Adjust as needed

  constructor(private http: HttpClient) {}

  verifyProfile(username: string, verificationCode: string) {
    const url = `${this.apiUrl}/api/profile/verify?username=${username}&verificationCode=${verificationCode}`;
    return this.http.post(url, {});
  }
}
