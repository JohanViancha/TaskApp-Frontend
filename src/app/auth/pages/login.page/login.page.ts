import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'login.page',
  standalone: true,
  imports: [],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage { }
