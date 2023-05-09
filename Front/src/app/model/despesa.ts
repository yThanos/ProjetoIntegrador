export class Despesa {
    codigo?: number;
    nome ?: string;
    valor ?: number;
    descricao ?: string;
    ativo ?: boolean;
    constructor(codigo?: number, nome ?: string, valor ?: number, descricao ?: string, ativo ?: boolean) {
      this.codigo = codigo;
      this.nome = nome;
      this.valor = valor;
      this.descricao = descricao;
      this.ativo = ativo;
    }
}
