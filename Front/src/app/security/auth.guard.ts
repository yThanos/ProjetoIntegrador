import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const usuario_logado = localStorage.getItem("token");

    if(usuario_logado == null){
      if(state.url.endsWith('login')){
        return true;
      }
      this.router.navigate(['login']);
    }else {
      if(state.url.endsWith('login')){
        this.router.navigate(['home']);
      }
      return true
    }
    return true;
  }
}

