import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from '../services';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertsService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error inesperado';
      
      if (error.error?.errors?.length > 1) {
        errorMessage = error.error.errors.join(', ');
      } else {
        errorMessage = error.error?.errors?.[0] || error.error?.message || errorMessage;
      }
      
      alertService.error(errorMessage);
      return throwError(() => error);
    })
  );
};
