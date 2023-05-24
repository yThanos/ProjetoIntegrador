import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:8080';
  private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private htpp: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    return this.htpp.post<any>(this.API + "/login", usuario, this.headers);
  }
  criarConta(usuario: Usuario): Observable<Usuario>{
    return this.htpp.post<Usuario>(this.API + "/criarConta", usuario, this.headers);
  }
  esqeuciSenha(email: string): Observable<any>{
    return this.htpp.get<any>(this.API + "/esqueceuSenha/" + email);
  }
  verificaCodigo(email: string, codigo: number): Observable<Usuario>{
    return this.htpp.get<Usuario>(this.API + "/verificarCodigo/" + email + "/" + codigo, this.headers);
  }
  alteraSenha(usuario: Usuario, email: string, codigo: number): Observable<any>{
    return this.htpp.put<any>(this.API + "/alterarSenha/"+email+"/"+codigo, usuario, this.headers);
  }
}
