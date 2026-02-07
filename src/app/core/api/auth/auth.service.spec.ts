import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // verifica que no queden requests pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login() should make GET request and return user and token', () => {
    const mockEmail = 'test@example.com';
    const mockResponse = {
      user: { id: '1', name: 'Test User', email: mockEmail } as User,
      token: 'abc123',
    };

    service.login(mockEmail).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login?email=${mockEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // simula respuesta del servidor
  });

  it('validateSession() should make GET request to /me', () => {
    const mockResponse = { id: '1', name: 'Test User', email: 'test@example.com' };

    service.validateSession().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/me`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
