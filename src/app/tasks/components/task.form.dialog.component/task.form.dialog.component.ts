import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogResponse, TaskForm } from './task.form.model';

@Component({
  selector: 'task-form-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  templateUrl: './task.form.dialog.component.html',
  styleUrl: './task.form.dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormDialogComponent {
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<
      TaskFormDialogComponent,
      DialogResponse<TaskForm>
    >,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm,
  ) {
    this.isEditMode = !!data;

    if (data) {
      this.form.patchValue(data);
    }
  }

  form = this.fb.nonNullable.group({
    title:  ['', Validators.required],
    description: [''],
  });

  save() {
    if (this.form.invalid) return;

    this.dialogRef.close({
      action: 'save',
      data: this.form.getRawValue()
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
