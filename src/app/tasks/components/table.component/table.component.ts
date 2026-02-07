import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { filter, finalize, switchMap, tap } from 'rxjs';
import { Task } from '../../../core/models/task.model';
import { ActionDialogComponent } from '../../../shared/components/action.dialog.component/action.dialog.component.js';
import { LoadingComponent } from '../../../shared/components/loading.component/loading.component';
import { TaskFormDialogComponent } from '../task.form.dialog.component/task.form.dialog.component';
import {
  DialogResponse,
  TaskForm,
} from '../task.form.dialog.component/task.form.model.js';
import { TaskService } from './../../../core/services/task.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'table-component',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  private dialog = inject(MatDialog);
  private taskService = inject(TaskService);
  loadingService = inject(LoadingService);

  displayedColumns: string[] = [
    'title',
    'description',
    'completed',
    'createdAt',
    'actions',
  ];

  @Input() tasks: Task[] = [];

  toggleCompleted(task: Task) {
    if (task.completed) return;
    this.loadingService.show();
    this.taskService
      .updateTask(task.id, {
        ...task,
        completed: !task.completed,
      })
      .pipe(finalize(() => this.loadingService.hide()))

      .subscribe();
  }

  editTask(task: Task) {
    this.openEditTask(task)
      .afterClosed()
      .pipe(
        filter(
          (res: DialogResponse<TaskForm>) => !!res && res.action === 'save',
        ),
        switchMap(({ data }) =>
          this.taskService.updateTask(task.id, {
            title: data?.title,
            description: data?.description,
          }),
        ),
      )
      .subscribe();
  }

  deleteTask({ id, title }: Task) {
    this.openDialogConfirmDeletion(title)
      .afterClosed()
      .pipe(
        tap((confirmed) => {
          if (!confirmed) return;
          this.loadingService.show();
          this.taskService
            .deleteTask(id)
            .pipe(
              finalize(() => {
                this.loadingService.hide();
              }),
            )
            .subscribe();
        }),
      )
      .subscribe();
  }

  openDialogConfirmDeletion(title: string) {
    return this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar tarea',
        message: `¿Seguro que deseas eliminar la tarea "${title}"?`,
        type: 'danger',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        showActions: true,
      },
    });
  }

  openEditTask(task: Task) {
    return this.dialog.open(TaskFormDialogComponent, {
      width: '600px',
      data: task,
    });
  }
}
