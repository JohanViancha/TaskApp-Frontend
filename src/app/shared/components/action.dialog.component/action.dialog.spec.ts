import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionDialogComponent } from './action.dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ActionDialogComponent', () => {
  let component: ActionDialogComponent;
  let fixture: ComponentFixture<ActionDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ActionDialogComponent>>;

  const mockDialogDataInput = { type: 'input' } as any;
  const mockDialogDataOther = { type: 'other' } as any;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ActionDialogComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogDataInput },
        { provide: MatDialogRef, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ActionDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as touched if input type and form invalid on confirm', () => {
    component.form.controls['name'].setValue('');
    component.confirm();
    expect(component.form.touched).toBeTrue();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close dialog with form value if input type and form valid on confirm', () => {
    component.form.controls['name'].setValue('Test Name');
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      action: 'save',
      value: { name: 'Test Name' },
    });
  });

  it('should close dialog with true if type is other on confirm', () => {
    // Cambiamos data para simular otro tipo
    component['data'] = mockDialogDataOther;
    component.confirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false on close', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
