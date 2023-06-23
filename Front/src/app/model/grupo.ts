export class Grupo {
    codigo?: number;
    nome ?: string;
    descricao ?: string;
    ativo ?: boolean;
    qtdUsuarios ?: number;
    divida?: number;
    lider?: number;
    valorPartes?: number;

    constructor(codigo?: number, nome ?: string, descricao ?: string, ativo ?: boolean, qtdUsuarios ?: number, divida?: number) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.ativo = ativo;
        this.qtdUsuarios = qtdUsuarios;
        this.divida = divida;
    }
}
