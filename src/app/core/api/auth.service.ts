import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(email: string) {
    return this.http.get<{user: User, token: string }>(`${this.baseUrl}/login?email=${email}`);
  }

  validateSession() {
    return this.http.get<string>(`${this.baseUrl}/me`);
  }
}
