export class Usuario {
  codigo?: number;
  nome?: string;
  username?: string;
  password?: string;
  cpf?: string;
  permissao?: string;
  ativo?: boolean;

  constructor(codigo?: number, nome?: string, email?: string, senha?: string, cpf?: string, permissao?: string, ativo?: boolean) {
    this.codigo = codigo;
    this.nome = nome;
    this.username = email;
    this.password = senha;
    this.cpf = cpf;
    this.permissao = permissao;
    this.ativo = ativo;
  }
}
