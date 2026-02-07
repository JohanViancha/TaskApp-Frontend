import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let userServiceMock: any;
  let authServiceMock: any;
  let routerMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    userServiceMock = {
      createUser: jasmine.createSpy('createUser').and.returnValue(of({ user: { id: '1', email: 'test@test.com' }, token: 'jwtToken' })),
    };

    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(null)),
      setUser: jasmine.createSpy('setUser'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ action: 'save', value: { name: 'Johan' } }),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginPage, BrowserAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as touched if invalid on submit', () => {
    component.loginForm.setValue({ email: '' });
    component.submit();
    expect(component.loginForm.touched).toBeTrue();
  });

  it('should call createUser if login returns null', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@test.com' });

    component.submit();
    tick(); // simula el paso de tiempo para observables

    expect(dialogMock.open).toHaveBeenCalled();
    expect(userServiceMock.createUser).toHaveBeenCalledWith({ name: 'Johan', email: 'test@test.com' });
    expect(authServiceMock.setUser).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasks']);
    expect(localStorage.getItem('jwtToken')).toBe('jwtToken');
  }));

  it('should store token and user if login returns data', fakeAsync(() => {
    authServiceMock.login.and.returnValue(of({ user: { id: '1', email: 'test@test.com' }, token: 'jwtToken' }));
    component.loginForm.setValue({ email: 'test@test.com' });

    component.submit();
    tick();

    expect(localStorage.getItem('jwtToken')).toBe('jwtToken');
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: '1', email: 'test@test.com' }));
    expect(authServiceMock.setUser).toHaveBeenCalledWith({ id: '1', email: 'test@test.com' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

});
