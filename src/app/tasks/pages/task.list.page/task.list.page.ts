import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../components/header.component/header.component';
import { TableComponent } from '../../components/table.component/table.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '../../components/task.form.dialog.component/task.form.dialog.component';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import {
  DialogResponse,
  TaskForm,
} from '../../components/task.form.dialog.component/task.form.model';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
@Component({
  selector: 'task.list.page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TableComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './task.list.page.html',
  styleUrl: './task.list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPage implements OnInit {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private taskService = inject(TaskService);
  tasks$ = this.taskService.getTasks();
  loading$ = this.taskService.getLoading();
  user$: Observable<User | null> = new BehaviorSubject(null);

  constructor() {
    this.user$ = this.authService.user$;
  }

  openCreateTask() {
    return this.dialog
      .open(TaskFormDialogComponent, {
        width: '600px',
      })
      .afterClosed()
      .pipe(
        filter(
          (res: DialogResponse<TaskForm>) => !!res && res.action === 'save',
        ),
        switchMap(({ data }) =>
          this.taskService.createTask({
            title: data?.title,
            description: data?.description,
          }),
        ),
      )
      .subscribe();
  }

  ngOnInit() {
    this.taskService.loadTasks();
  }
}
