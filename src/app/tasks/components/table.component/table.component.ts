import { TaskService } from './../../../core/services/task.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { TaskPaginationComponent } from '../task.pagination.component/task.pagination.component';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Task } from '../../../core/models/task.model';
import { LoadingComponent } from '../../../shared/components/loading.component/loading.component';
import { TaskFormDialogComponent } from '../task.form.dialog.component/task.form.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import {
  DialogResponse,
  TaskForm,
} from '../task.form.dialog.component/task.form.model.js';
import { ActionDialogComponent } from '../../../shared/components/action.dialog.component/action.dialog.component.js';

@Component({
  selector: 'table-component',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    TaskPaginationComponent,
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
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
  ) {}

  displayedColumns: string[] = [
    'title',
    'description',
    'completed',
    'createdAt',
    'actions',
  ];

  @Input() tasks: Task[] = [];
  @Input() isLoading: boolean = false;

  pageSize = 5;
  pageIndex = 0;

  pagedTasks = [...this.tasks];

  toggleCompleted(task: Task) {
    if (task.completed) return;
    this.taskService
      .updateTask(task.id, {
        ...task,
        completed: !task.completed,
      })
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
          this.taskService.deleteTask(id).subscribe();
        }),
      )
      .subscribe();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;

    this.pagedTasks = this.tasks.slice(start, end);
  }

  openDialogConfirmDeletion(title: string) {
    return this.dialog.open(ActionDialogComponent, {
      width: '400px',
      data: {
        title: "Eliminar tarea",
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

  ngOnInit() {
    this.onPageChange({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    });
  }
}
