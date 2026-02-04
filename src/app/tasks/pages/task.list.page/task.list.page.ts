import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'task.list.page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './task.list.page.html',
  styleUrl: './task.list.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPage {}
