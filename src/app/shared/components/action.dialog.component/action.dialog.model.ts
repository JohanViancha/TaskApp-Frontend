export type ActionDialogType = 'info' | 'confirm' | 'input';

export interface ActionDialogData  {
  title?: string;
  message: string;
  type?: ActionDialogType;
  showActions?: boolean;
  confirmText?: string;
  cancelText?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string;
}
