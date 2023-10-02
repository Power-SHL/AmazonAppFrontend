import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  private usernameSubject = new BehaviorSubject<string>(''); // Initial value is an empty string
  public username$ = this.usernameSubject.asObservable();
  setUsername(username: string) {
    this.usernameSubject.next(username);
  }
}
