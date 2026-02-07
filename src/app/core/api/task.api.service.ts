import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task.model';
import { WITH_CREDENTIALS } from '../../shared/models/user.context.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private baseUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(`${this.baseUrl}`, {
      context: new HttpContext().set(WITH_CREDENTIALS, true),
    });
  }

  createTask(data: Partial<Task>) {
    return this.http.post<Task>(this.baseUrl, data, {
      context: new HttpContext().set(WITH_CREDENTIALS, true),
    });
  }

  updateTask(id: string, data: Partial<Task>) {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, data, {
      context: new HttpContext().set(WITH_CREDENTIALS, true),
    });
  }

  deleteTask(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      context: new HttpContext().set(WITH_CREDENTIALS, true),
    });
  }
}
