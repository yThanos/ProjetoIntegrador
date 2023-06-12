import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Usuario } from 'src/app/model/usuario';
import { DespesaService } from 'src/app/service/despesa.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent {
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
  constructor(private rota: Router, private service: DespesaService) {
    setTimeout(() => {
      this.listar();
    }, 500)
  }
  opcao: string = 'Cadastrar';
  quitadas: Despesa[] = [];
  despesas: Despesa[] = [];
  editDesp: Despesa = new Despesa();
  despesa: Despesa = new Despesa();
  listar(){
    if(this.usuario.codigo != undefined)
    this.service.getUserDesp(this.usuario.codigo).subscribe((resposta: Despesa[]) => {
      this.despesas = [];
      this.quitadas = [];
      for(let resp of resposta){
        if(resp.ativo == true){
          this.despesas.push(resp);
        }else{
          this.quitadas.push(resp);
        }
      }
    })
  }
  criar(){
    this.despesa.dtCriacao = new Date().toISOString().split('T')[0];
    this.despesa.origem = "U"
    this.despesa.codigoOrigem = this.usuario.codigo;
    this.service.cadastrar(this.despesa).subscribe((resposta: number) => {
      this.despesa = new Despesa();
      document.getElementById('sair')?.click();
      this.listar();
    })
  }
  excluir(despesa: Despesa){
    this.despesa = despesa;
    if(confirm('Deseja realmente deletar a despesa ' + despesa.nome + '?')){
      this.remover();
    }
  }
  remover(){
    if(this.despesa.codigo != undefined)
    this.service.deletar(this.despesa.codigo).subscribe((resposta: Despesa) => {
      this.despesa = new Despesa();
      this.listar();
    })
  }
  selecionar(id?: number){
    this.opcao = 'Editar';
    if(id != undefined)
    this.service.getById(id).subscribe((resposta: Despesa) => {
      this.despesa = resposta;
      let teste = document.getElementById('teste')
      setTimeout(() => {
        teste?.click();
      }, 100)
    })
  }
  editar(){
    if(this.despesa.codigo != undefined)
    this.service.editar(this.despesa, this.despesa.codigo).subscribe((resposta: Despesa) => {
      this.despesa = new Despesa();
      document.getElementById('sair')?.click();
      this.listar();
    })
  }
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
  detalhes(id?:number){
    if(id != undefined)
    this.service.getById(id).subscribe((resposta: Despesa) => {
      this.despesa = resposta;
      let teste = document.getElementById('detalhe')
      setTimeout(() => {
        teste?.click();
      }, 100)
    })
  }
  reset(){
    let fechar = document.getElementById('fechaModal');
    fechar?.click();
    setTimeout(() => {
      this.despesa = new Despesa();
    }, 300)
  }
  resetCad(){
    let fechar = document.getElementById('fechaModalCad');
    fechar?.click();
    setTimeout(() => {
      this.despesa = new Despesa();
    }, 300)
  }
}
