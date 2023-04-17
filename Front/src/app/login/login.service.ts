import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:8080';
  private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private htpp: HttpClient) { }

  login(usuario: Usuario){
    return this.htpp.post(this.API + "/login", usuario, this.headers);
  }
  criarConta(usuario: Usuario){
    return this.htpp.post(this.API + "/criarConta", usuario, this.headers);
  }

}
