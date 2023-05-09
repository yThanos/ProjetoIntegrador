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
          localStorage.clear();
          if(confirm("Erro 403 - Acesso negado, deseja fazer login novamente?")){
            this.rota.navigate(["/login"]);
          }else{
            this.rota.navigate(["/login"]);
          }
          break;
        case 401:
          localStorage.clear();
          this.rota.navigate(["/login"]);
          break;
      }
    }
  }
}
