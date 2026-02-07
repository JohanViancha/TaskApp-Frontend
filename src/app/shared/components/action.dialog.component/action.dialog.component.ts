import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActionDialogData } from './action.dialog.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'action-dialog-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './action.dialog.component.html',
  styleUrl: './action.dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionDialogComponent {
  private dialogRef = inject(MatDialogRef<ActionDialogComponent>);
  private fb = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: ActionDialogData) {}

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  confirm() {
    if (this.data.type === 'input' && this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.data.type === 'input' && this.form.valid) {
      this.dialogRef.close({
        action: 'save',
        value: this.form.getRawValue(),
      });
      return;
    }

    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
