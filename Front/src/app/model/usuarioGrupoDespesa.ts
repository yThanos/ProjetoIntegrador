export class UsuarioGrupoDespesa {
    codigo?: number;
    codigoUsuario?: number;
    codigoGrupoDespesa?: number;
    valor?: number;
    ativo?: boolean;
    constructor(codigo?: number, codigoUsuario?: number, codigoGrupoDespesa?: number, valor?: number, ativo?: boolean) {
        this.codigo = codigo;
        this.codigoUsuario = codigoUsuario;
        this.codigoGrupoDespesa = codigoGrupoDespesa;
        this.valor = valor;
        this.ativo = ativo;
    }
}