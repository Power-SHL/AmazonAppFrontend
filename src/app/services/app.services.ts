import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://streamitbackend.azurewebsites.net/'; 

  constructor(private http: HttpClient) {}

  getSomeData() {
    return this.http.get(`${this.apiUrl}/some-endpoint`);
  }

}
