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

  listar(): Observable<Usuario[]>{//talvez para admin ou algo do tipo
    return this.http.get<Usuario[]>(this.API + "/usuario", this.headers);
  }
  editar(usuario: Usuario, id: number): Observable<Usuario>{//editar conta
    return this.http.put<Usuario>(this.API + "/usuario/"+id, usuario, this.headers);
  }
  deletar(id: number): Observable<any>{//ativo = false
    return this.http.delete<any>(this.API + "/usuario/"+id, this.headers);
  }
  getById(id: number): Observable<Usuario>{//autoexplicativo muito usado
    return this.http.get<Usuario>(this.API + "/usuario/"+id, this.headers);
  }
  getByEmail(email: string): Observable<Usuario>{//pesquisa para adicionar no grupo
    return this.http.get<Usuario>(this.API + "/usuario/byEmail/"+email, this.headers);
  }
}
