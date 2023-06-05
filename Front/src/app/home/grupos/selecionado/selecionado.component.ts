import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Grupo } from 'src/app/model/grupo';
import { Usuario } from 'src/app/model/usuario';
import { DespesaService } from 'src/app/service/despesa.service';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-selecionado',
  templateUrl: './selecionado.component.html',
  styleUrls: ['./selecionado.component.css']
})
export class SelecionadoComponent {
  grupo: Grupo = JSON.parse(<string>localStorage.getItem('grupo'));
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
  constructor(private rota: Router, private service: GrupoService, private despesaService: DespesaService) {
    this.service.getUsersGrupo(this.grupo.codigo).subscribe((resposta: Usuario[]) => {
      this.usuarios = resposta;
    })
    if(this.grupo.codigo != undefined)
    this.despesaService.getGroupDesp(this.grupo.codigo).subscribe((resposta: Despesa[]) => {
      this.despesas = resposta;
      console.log(this.despesas);
      setTimeout(() => {
        for(let desp of this.despesas){
          console.log(desp);
          console.log(this.grupo);
          console.log(this.usuario);
          this.service.despesaporuserdogrupo(this.grupo.codigo, this.usuario.codigo, desp.codigo).subscribe((resposta: any) => {
            desp.parte = resposta;
          })
        }
      }, 500);
    })
  }

  usuarios: Usuario[] = [];
  despesas: Despesa[] = [];
  despesa: Despesa = new Despesa();
  opcao: string = "Cadastrar";

  inicio(){
    this.rota.navigate(['/home/grupos']);
  }
  listar(){


  }
  criar(){
    this.despesa.dtCriacao = new Date().toISOString().split('T')[0];
    this.despesa.origem = "G"
    this.despesa.codigoOrigem = this.grupo.codigo;
    this.despesaService.cadastrar(this.despesa).subscribe((resposta: Despesa) => {
      this.despesa = new Despesa();
      this.listar();
    })
  }

  resetCad(){
    let fechar = document.getElementById('fechaModalCad');
    fechar?.click();
    setTimeout(() => {
      this.despesa = new Despesa();
    }, 300)
  }
}
