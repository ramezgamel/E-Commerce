import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';



@Injectable()

export class GlobalErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    // .pipe(
    //   catchError(err => {
    //     console.log(err.error);
    //     return throwError(()=> err)
    //   })
    // );
  }
}
