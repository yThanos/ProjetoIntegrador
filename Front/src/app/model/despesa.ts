export class Despesa {
    codigo?: number;
    nome ?: string;
    valor ?: number;
    descricao ?: string;
    origem ?: string;
    codigoOrigem?: number;
    ativo ?: boolean;
    constructor(codigo?: number, nome ?: string, valor ?: number, descricao ?: string, ativo ?: boolean, origem ?: string, codigoOrigem?: number) {
      this.codigo = codigo;
      this.nome = nome;
      this.valor = valor;
      this.descricao = descricao;
      this.ativo = ativo;
      this.origem = origem;
      this.codigoOrigem = codigoOrigem;
    }
}
