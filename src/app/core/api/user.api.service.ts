import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  createUser(data: Partial<User>) {
    return this.http.post<{user: User, token: string }>(this.baseUrl, data);
  }
}
