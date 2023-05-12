export class Grupo {
    codigo?: number;
    nome ?: string;
    descricao ?: string;
    ativo ?: boolean;

    constructor(codigo?: number, nome ?: string, descricao ?: string, ativo ?: boolean) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.ativo = ativo;
    }
}
