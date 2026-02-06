import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private baseUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  getTasks(userId: string) {
    return this.http.get<Task[]>(`${this.baseUrl}/${userId}`, {
      withCredentials: true,
    });
  }

  createTask(data: Partial<Task>) {
    return this.http.post<Task>(this.baseUrl, data, {
      withCredentials: true,
    });
  }

  updateTask(id: string, data: Partial<Task>) {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, data, {
      withCredentials: true,
    });
  }

  deleteTask(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
