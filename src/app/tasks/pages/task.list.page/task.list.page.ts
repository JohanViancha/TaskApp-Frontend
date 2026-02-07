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
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  finalize,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  DialogResponse,
  TaskForm,
} from '../../components/task.form.dialog.component/task.form.model';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { LoadingService } from '../../../shared/services/loading.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../core/models/task.model';
import { MatInputModule } from '@angular/material/input';
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
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
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
  user$: Observable<User | null> = new BehaviorSubject(null);
  filteredTasks$ = new BehaviorSubject<Task[]>([]);
  loadingService = inject(LoadingService);

  searchControl = new FormControl('');

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
        tap(() => this.loadingService.show()),
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
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe();
  }

  ngOnInit() {
    this.taskService.loadTasks();
    combineLatest([
      this.tasks$,
      this.searchControl.valueChanges.pipe(debounceTime(300), startWith('')),
    ])
      .pipe(
        map(([tasks, searchTerm]) =>
          tasks.filter((task) =>
            task.title
              .toLowerCase()
              .includes((searchTerm || '').toLowerCase() || ''),
          ),
        ),
      )
      .subscribe((filtered) => this.filteredTasks$.next(filtered));
  }
}
