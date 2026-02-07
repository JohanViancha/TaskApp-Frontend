import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { HttpClient, HttpContext } from '@angular/common/http';
import { WITH_CREDENTIALS } from '../../shared/models/user.context.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(email: string) {
    return this.http.get<User>(`${this.baseUrl}/login?email=${email}`);
  }

  validateSession() {
    return this.http.get(`${this.baseUrl}/me/`, {
      context: new HttpContext().set(WITH_CREDENTIALS, true),
    });
  }
}
