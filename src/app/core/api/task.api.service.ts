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
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  createTask(data: Partial<Task>) {
    return this.http.post<Task>(this.baseUrl, data);
  }

  updateTask(id: string, data: Partial<Task>) {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, data);
  }

  deleteTask(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
