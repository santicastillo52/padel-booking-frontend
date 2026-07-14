import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


//Como cambiamos el la forma de respuesta del back, ahora tenemos que aplicar este interceptor
//Antes direcamente enviamos la data ahora la enviamos con success, message y la data
export const ResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        // Verificar si la respuesta tiene la estructura de ApiResponse
        if (event.body && typeof event.body === 'object' && 'success' in event.body && 'data' in event.body) {
          // Crear una nueva respuesta con solo los datos
          return event.clone({
            body: event.body.data
          });
        }
      }
      return event;
    })
  );
};
