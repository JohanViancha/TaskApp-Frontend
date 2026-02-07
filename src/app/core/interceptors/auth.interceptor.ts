import type { HttpInterceptorFn } from '@angular/common/http';
import { WITH_CREDENTIALS } from '../../shared/models/user.context.model';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const useCredentials = req.context.get(WITH_CREDENTIALS);

  if (useCredentials) {
    const clonedReq = req.clone({ withCredentials: true });
    return next(clonedReq);
  }

  return next(req);
};
