import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    withCredentials: true,
  });

  return next(clone);
};
