import { Categoria } from "./categoria";
import { Grupo } from "./grupo";
import { Usuario } from "./usuario";

export class Despesa {
    codigo?: number;
    nome ?: string;
    categoria?: Categoria;
    valor ?: number;
    frequencia?: number;
    descricao ?: string;
    ativo ?: boolean;
    codigo_usuario?: number;
    grupo?: Grupo;
    constructor(codigo?: number, nome ?: string, categoria?: Categoria, valor ?: number, frequencia?: number, descricao ?: string, ativo ?: boolean, codigo_usuario?: number, grupo?: Grupo) {
      this.codigo = codigo;
      this.nome = nome;
      this.categoria = categoria;
      this.valor = valor;
      this.frequencia = frequencia;
      this.descricao = descricao;
      this.ativo = ativo;
      this.codigo_usuario = codigo_usuario;
      this.grupo = grupo;
    }
}
