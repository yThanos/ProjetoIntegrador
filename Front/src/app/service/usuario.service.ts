import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  private readonly API = 'http://localhost:8080';
  private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  listar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API + "/usuario", this.headers);
  }
  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.API + "/usuario", usuario, this.headers);
  }
  editar(usuario: Usuario, id: number): Observable<Usuario>{
    return this.http.put<Usuario>(this.API + "/usuario/"+id, usuario, this.headers);
  }
  deletar(id: number): Observable<any>{
    return this.http.delete<any>(this.API + "/usuario/"+id, this.headers);
  }
  getById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API + "/usuario/"+id, this.headers);
  }
  getByEmail(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.API + "/usuario/byEmail/"+email, this.headers);
  }
}
