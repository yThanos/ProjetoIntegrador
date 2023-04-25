import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler{

  constructor(private rota: Router) {
    super();
  }

  override handleError(error: HttpErrorResponse | any) {
    if(error instanceof HttpErrorResponse){
      switch (error.status){
        case 403:
          console.log("403");
          localStorage.clear();
          this.rota.navigate(["/login"]);
          break;
        case 401:
          console.log("401");
          localStorage.clear();
          this.rota.navigate(["/login"]);
          break;
      }
    }
  }
}
