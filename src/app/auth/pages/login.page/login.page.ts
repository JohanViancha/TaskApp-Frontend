import { UserService } from './../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { ActionDialogComponent } from '../../../shared/components/action.dialog.component/action.dialog.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'login.page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  createUser(email: string) {
    return this.dialog
      .open(ActionDialogComponent, {
        width: '400px',
        data: {
          title: 'Iniciar sesión',
          message: `El correo ${email} no está registrado. Si deseas crear una cuenta, ingresa tu nombre y presiona .`,
          type: 'input',
          confirmText: 'Crear',
          cancelText: 'Cancelar',
          showActions: true,
          inputLabel: 'Nombre',
        },
      })
      .afterClosed()
      .pipe(
        filter((res) => !!res && res.action === 'save'),
        switchMap((result) =>
          this.userService.createUser({
            ...result.value,
            email,
          }),
        ),
        tap((user) => {
          if (!user) return;
          this.authService.setUser(user);
          this.router.navigate(['/tasks']);
        }),
      )
      .subscribe();
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email } = this.loginForm.getRawValue();

    this.authService
      .login(email)
      .pipe(
        tap((user) => {
          if (!user) {
            this.createUser(email);
            return;
          }
          this.authService.setUser(user);
          this.router.navigate(['/tasks']);
        }),
      )

      .subscribe();
  }
}
