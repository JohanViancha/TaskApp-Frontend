import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { UserApiService } from '../api/user.api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userService = inject(UserApiService);

  createUser(user: Partial<User>) {
    return this.userService.createUser(user);
  }
}
