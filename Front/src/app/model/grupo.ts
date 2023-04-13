import { Usuario } from "./usuario";

export interface Grupo {
    codigo: number;
    nome : string;
    descricao : string;
    usuario: Usuario;
    ativo : boolean;
}
