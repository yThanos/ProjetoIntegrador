import { UsuarioGrupoDespesa } from "./usuarioGrupoDespesa";

export class Partes{
  partes?: UsuarioGrupoDespesa[];
  idDespesa?: number;
  constructor(partes?: UsuarioGrupoDespesa[], idDesp?: number){
    this.partes = partes;
    this.idDespesa = idDesp;
  }
}
