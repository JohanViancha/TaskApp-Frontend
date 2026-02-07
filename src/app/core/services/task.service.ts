import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { TaskApiService } from '../api/task.api.service';
import { Task } from '../models/task.model';
import { LoadingService } from '../../shared/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskApi = inject(TaskApiService);
  private loadingService = inject(LoadingService);
  private tasks$ = new BehaviorSubject<Task[]>([]);

  loadTasks() {
    this.loadingService.show();
    this.taskApi
      .getTasks()
      .pipe(
        tap((tasks) => this.tasks$.next(tasks)),
        finalize(() => this.loadingService.hide()),
      )
      .subscribe();
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  setTask(task: Task[]) {
    this.tasks$.next(task);
  }

  createTask(data: Partial<Task>) {
    return this.taskApi.createTask(data).pipe(
      tap((newTask) => {
        const currentTasks = this.tasks$.getValue();
        this.tasks$.next([...currentTasks, newTask]);
      }),
      finalize(() => this.loadingService.hide()),
    );
  }

  updateTask(id: string, data: Partial<Task>) {
    return this.taskApi.updateTask(id, data).pipe(
      tap((updatedTask) => {
        const currentTasks = this.tasks$.getValue();
        const updatedTasks = currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        );
        this.tasks$.next(updatedTasks);
      }),
    );
  }

  deleteTask(id: string) {
    return this.taskApi.deleteTask(id).pipe(
      tap(() => {
        const currentTasks = this.tasks$.getValue();
        this.tasks$.next(currentTasks.filter((t) => t.id !== id));
      }),
      finalize(() => this.loadingService.hide()),
    );
  }
}
