export class Usuario {
  codigo?: number;
  nome?: string;
  email?: string;
  senha?: string;
  cpf?: string;
  permissao?: string;
  ativo?: boolean;

  constructor(codigo?: number, nome?: string, email?: string, senha?: string, cpf?: string, permissao?: string, ativo?: boolean) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.permissao = permissao;
    this.ativo = ativo;
  }
}
