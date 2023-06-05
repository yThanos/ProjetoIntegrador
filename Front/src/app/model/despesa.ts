export class Despesa {
    codigo?: number;
    nome ?: string;
    valor ?: number;
    descricao ?: string;
    dtCriacao ?: string;
    dtQuitada ?: string;
    origem ?: string;
    codigoOrigem?: number;
    ativo ?: boolean;
    parte ?: number;
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
