import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class JwtInterceptor /*implements HttpInterceptor*/{


  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if(token){
      const cloneReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloneReq);
    }else{
      return next.handle(req);
    }
  }*/
}
