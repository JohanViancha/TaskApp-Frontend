import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../api/auth.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }

  clear() {
    this.userSubject.next(null);
    localStorage.removeItem('jwtToken');
  }

  private authService = inject(AuthApiService);

  login(email: string) {
    return this.authService.login(email);
  }

  validateSession() {
    return this.authService.validateSession();
  }
}
