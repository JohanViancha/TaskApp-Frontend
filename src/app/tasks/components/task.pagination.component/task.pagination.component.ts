import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'task-pagination-component',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './task.pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPaginationComponent {
  @Input() length = 0;
  @Input() pageSize = 5;
  @Input() pageIndex = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
