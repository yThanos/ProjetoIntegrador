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
  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    return this.http.post<any>(this.API + "/login", usuario, this.headers);
  }
  criarConta(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.API + "/criarConta", usuario, this.headers);
  }
  esqeuciSenha(email: string): Observable<any>{
    return this.http.get<any>(this.API + "/esqueceuSenha/" + email);
  }
  verificaCodigo(email: string, codigo: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API + "/verificarCodigo/" + email + "/" + codigo, this.headers);
  }
  alteraSenha(usuario: Usuario, codigo: number): Observable<any>{
    return this.http.put<any>(this.API + "/alterarSenha/"+codigo, usuario, this.headers);
  }
}
