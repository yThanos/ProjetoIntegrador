import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AppService } from '../app.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loading: AppService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loading.show();
        const token = localStorage.getItem("token")
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        return next.handle(request).pipe(finalize(() => {this.loading.hide()}));
    }
}
