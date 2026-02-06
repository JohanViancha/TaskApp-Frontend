export interface DialogResponse<T> {
  action: 'save' | 'cancel' | 'delete';
  data?: T;
}

export interface TaskForm {
  title: string;
  description?: string;
}
