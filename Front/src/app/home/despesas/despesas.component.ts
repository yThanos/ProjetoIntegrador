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
    /*this.despesa.codigo_usuario = this.usuario.codigo;
    this.service.cadastrar(this.despesa).subscribe((resposta: Despesa) => {
      this.despesa = new Despesa();
      this.listar();
    })*/
    console.log(this.despesa);
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
      console.log(this.despesa);
      let teste = document.getElementById('teste')
      setTimeout(() => {
        teste?.click();
      }, 500)
    })
  }
  editar(){

  }
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
}
