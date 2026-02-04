import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/pages/login.page/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/pages/task.list.page/task.list.page').then(
        (m) => m.TaskListPage,
      ),
  },
];
