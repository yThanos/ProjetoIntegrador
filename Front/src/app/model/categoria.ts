export class Categoria {
    codigo?: number;
    nome?: string;
    descricao?: string;
    ativo?: boolean;
    codcriador?: number;
    constructor(codigo?: number, nome?: string, descricao?: string, ativo?: boolean, codcriador?: number) {
      this.codigo = codigo;
      this.nome = nome;
      this.descricao = descricao;
      this.ativo = ativo;
      this.codcriador = codcriador;
    }
}
