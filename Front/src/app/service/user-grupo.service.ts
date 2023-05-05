import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserGrupo } from '../model/usuariogrupo';

@Injectable({
  providedIn: 'root'
})
export class UserGrupoService {
  constructor(private htpp: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private readonly headers = { headers: { 'Content-Type': 'application/json' } };

  getGrupoUser(id: number) {//pega os grupos do usuario
    return this.htpp.get(this.API + "/userGrup/usuarios/" + id, this.headers);
  }
  getUserGrupo(id: number) {//pega os usuarios do grupo
    return this.htpp.get(this.API + "/userGrup/grupos/" + id, this.headers);
  }
  addUserGrupo(userGrupo: UserGrupo) {//adiciona usuario no grupo
    return this.htpp.post(this.API + "/userGrup", userGrupo, this.headers);
  }
  removeUserGrupo(userGrupo: UserGrupo) {//remove usuario do grupo
    return this.htpp.delete(this.API + "/userGrup/" + userGrupo, this.headers);
  }
}
