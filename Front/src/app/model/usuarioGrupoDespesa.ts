export class UsuarioGrupoDespesa {
    codigo?: number;
    codigoUsuario?: number;
    codigoGrupo?: number;
    codigoDespesa?: number;
    valor?: number;
    ativo?: boolean;
    constructor(codigoUsuario?: number, codigoGrupo?: number, valor?: number, codigo?: number, codigoDespesa?: number, ativo?: boolean) {
        this.codigo = codigo;
        this.codigoUsuario = codigoUsuario;
        this.codigoGrupo = codigoGrupo;
        this.codigoDespesa = codigoDespesa;
        this.valor = valor;
        this.ativo = ativo;
    }
}
