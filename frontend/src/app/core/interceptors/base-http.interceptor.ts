import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageHandlerService } from '../handlers/storage-handler.service';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

  constructor(private storageHandlerService: StorageHandlerService) { }
  token = this.storageHandlerService.getItem(localStorage, 'token', true);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes("auth") && this.token) {
      request = this.setAuth(request);
    }

    return next.handle(request);
  }

  setAuth(request: HttpRequest<unknown>): HttpRequest<any> {
    if (this.token) {
      return request.clone({
        setHeaders: { Authorization: `${this.token}` }
      });
    }
  }
}
