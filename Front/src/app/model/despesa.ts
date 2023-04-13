import { Categoria } from "./categoria";
import { Grupo } from "./grupo";
import { Usuario } from "./usuario";

export interface Despesa {
    codigo: number;
    nome : string;
    categoria: Categoria;
    valor : number;
    frequencia: number;
    descricao : string;
    ativo : boolean;
    usuario: Usuario;
    grupo: Grupo;

}
