export class Parte{
  valor?: number;
  nome?: string;
  pago?: boolean;
  constructor(valor?: number, nome?: string, pago?: boolean){
    this.valor = valor;
    this.nome = nome;
    this.pago = pago;
  }

}
