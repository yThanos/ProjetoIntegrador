import { Parte } from "./parte";

export class ViewDG{
  codigo?: number;
  nome?: string;
  descricao?: string;
  data?: string;
  valor?: number;
  partes?: Parte[];
  constructor(codigo?: number, nome?: string, descricao?: string, data?: string, valor?: number, partes?: Parte[]){
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data;
    this.valor = valor;
    this.partes = partes;
  }
}
