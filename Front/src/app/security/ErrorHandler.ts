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
        case 400:
          alert('Usuário ou Senha incorretos')
          break;
        case 417:
          alert('Token expirado!')
            sessionStorage.removeItem("jwt");
            this.rota.navigate(["/login"]);
          break;
      }
    }
  }
}
