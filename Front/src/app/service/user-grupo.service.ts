import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGrupoService {
  constructor(private htpp: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private readonly headers = { headers: { 'Content-Type': 'application/json' } };

  getGrupoUser(id: number) {//pega os grupos do usuario
    return this.htpp.get(this.API + "/userGrup/user/" + id, this.headers);
  }
  getUserGrupo(id: number) {//pega os usuarios do grupo
    return this.htpp.get(this.API + "/userGrup/grupo/" + id, this.headers);
  }
  addUserGrupo(userGrupo: any) {//cadastra usuario no grupo
    return this.htpp.post(this.API + "/userGrup", userGrupo, this.headers);
  }
  removeUserGrupo(id: number) {//remove usuario do grupo
    return this.htpp.delete(this.API + "/userGrup/" + id, this.headers);
  }
}
