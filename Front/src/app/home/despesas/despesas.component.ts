import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Despesa } from 'src/app/model/despesa';
import { Usuario } from 'src/app/model/usuario';
import { CategoriaService } from 'src/app/service/categoria.service';
import { DespesaService } from 'src/app/service/despesa.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent {
  constructor(private rota: Router, private service: DespesaService, private categService: CategoriaService) {
    this.listar();
   }
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
  categorias: Categoria[] = [];
  despesas: Despesa[] = []
  despesa: Despesa = new Despesa();
  listar(){
    if(this.usuario.codigo != undefined)
    this.service.getUserDesp(this.usuario.codigo).subscribe((resposta: Despesa[]) => {
        this.despesas = resposta;
      }
    )
    if(this.usuario.codigo != undefined)
    this.categService.listar(this.usuario.codigo).subscribe((resposta: Categoria[]) => {
      this.categorias = resposta;
    })
  }
  criar(){
    this.service.cadastrar(this.despesa).subscribe((resposta: Despesa) => {
      this.despesa = new Despesa();
      this.listar();
    })
  }
  selecionar(despesa: Despesa){
    this.despesa = despesa;
    if(confirm('Deseja realmente deletar a despesa ' + despesa.nome + '?')){
      this.remover();
    }
  }
  remover(){
    let posicao = this.despesas.indexOf(this.despesa);
    this.despesas.splice(posicao, 1);
  }
  editar(){
    let posicao = this.despesas.indexOf(this.despesa);
    this.despesas[posicao] = this.despesa;
  }
}
