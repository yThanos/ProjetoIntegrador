import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../model/grupo';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  constructor(private htpp: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private readonly headers = { headers: { 'Content-Type': 'application/json' } };

  getGrupoById(id: number): Observable<Grupo>{//pega o grupo pelo id
    return this.htpp.get<Grupo>(this.API + "/grupo/" + id, this.headers);
  }
  addGrupo(grupo: Grupo): Observable<Grupo>{//cadastra grupo
    return this.htpp.post<Grupo>(this.API + "/grupo", grupo, this.headers);
  }
  editGrupo(grupo: Grupo, id: number): Observable<Grupo>{//edita grupo
    return this.htpp.put<Grupo>(this.API + "/grupo/" + id, grupo, this.headers);
  }
  deleteGrupo(id: number): Observable<Grupo>{//ativo = false
    return this.htpp.delete<Grupo>(this.API + "/grupo/" + id, this.headers);
  }
  getAll(): Observable<Grupo[]>{//talvez para admin, log ou estatistica
    return this.htpp.get<Grupo[]>(this.API + "/grupo/all", this.headers);
  }
  getGruposByUser(id: number): Observable<Grupo[]> {//pega os grupos do usuario
    return this.htpp.get<Grupo[]>(this.API + "/grupo/byUser/" + id, this.headers);
  }
  getUsersGrupo(id?: number): Observable<Usuario[]> {//pega a quantidade de usuarios no grupo
    return this.htpp.get<Usuario[]>(this.API + "/grupo/usersByGrupo/" + id, this.headers);
  }
}
