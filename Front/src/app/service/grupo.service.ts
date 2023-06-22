import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../model/grupo';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioGrupoDespesa } from '../model/usuarioGrupoDespesa';
import { Partes } from '../model/partes';
import { ViewDG } from '../model/viewDG';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private readonly headers = { headers: { 'Content-Type': 'application/json' } };

  getGrupoById(id: number): Observable<Grupo>{//pega o grupo pelo id
    return this.http.get<Grupo>(this.API + "/grupo/" + id, this.headers);
  }
  addGrupo(grupo: Grupo, id: number): Observable<Grupo>{//cadastra grupo
    return this.http.post<Grupo>(this.API + "/grupo/"+id, grupo, this.headers);
  }
  editGrupo(grupo: Grupo, id: number): Observable<Grupo>{//edita grupo
    return this.http.put<Grupo>(this.API + "/grupo/" + id, grupo, this.headers);
  }
  deleteGrupo(id: number): Observable<Grupo>{//ativo = false
    return this.http.delete<Grupo>(this.API + "/grupo/" + id, this.headers);
  }
  getAll(): Observable<Grupo[]>{//talvez para admin, log ou estatistica
    return this.http.get<Grupo[]>(this.API + "/grupo/all", this.headers);
  }
  getGruposByUser(id: number): Observable<Grupo[]> {//pega os grupos do usuario
    return this.http.get<Grupo[]>(this.API + "/grupo/byUser/" + id, this.headers);
  }
  getUsersGrupo(id?: number): Observable<Usuario[]> {//pega a quantidade de usuarios no grupo
    return this.http.get<Usuario[]>(this.API + "/grupo/usersByGrupo/" + id, this.headers);
  }
  despesaporuserdogrupo(grupo?: number, user?: number, despesa?: number): Observable<any>{
    return this.http.get<any>(this.API + "/grupo/" + grupo + "/" + user + "/" + despesa, this.headers);
  }
  getPartes(grupo?: number, despesa?: number): Observable<UsuarioGrupoDespesa[]>{
    return this.http.get<UsuarioGrupoDespesa[]>(this.API + "/grupo/partes/" + grupo + "/" + despesa, this.headers);
  }
  addPartes(partes: Partes): Observable<Partes>{
    return this.http.post<Partes>(this.API + "/grupo/partes", partes, this.headers);
  }
  getview(id:number): Observable<ViewDG>{
    return this.http.get<ViewDG>(this.API + "/grupo/despesaView/" + id, this.headers);
  }
}
