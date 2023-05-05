import { Grupo } from "./grupo";
import { Usuario } from "./usuario";

export class UserGrupo{
  usuario?: Usuario;
  grupo?: Grupo;

  constructor(usuario?: Usuario, grupo?: Grupo){
    this.usuario = usuario;
    this.grupo = grupo;
  }
}
