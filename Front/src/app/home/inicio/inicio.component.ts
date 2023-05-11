import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Grupo } from 'src/app/model/grupo';
import { Usuario } from 'src/app/model/usuario';
import { DespesaService } from 'src/app/service/despesa.service';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  quantidade = 0;
  valor = 0.0;
  qtdGrupo = 0;
  valorGrupo = 0.0;
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
  constructor(private rota: Router, private despesaService: DespesaService, private grupoService: GrupoService) {
    if(this.usuario.codigo != undefined){
      this.despesaService.getUserDesp(this.usuario.codigo).subscribe((resposta:Despesa[])=>{
        for(let desp of resposta){
          if (desp.ativo == true){
          this.quantidade++;
          if(desp.valor != undefined)
          this.valor += desp.valor;
          }
        }
      })
      this.grupoService.getGruposByUser(this.usuario.codigo).subscribe((resposta:Grupo[])=>{this.qtdGrupo = resposta.length;})
      this.despesaService.valorDespesasByUserGrup(this.usuario.codigo).subscribe((resposta:number)=>{this.valorGrupo = resposta;})
    }
  }
  grupos(){
    this.rota.navigate(['home/grupos']);
  }
  despesas(){
    this.rota.navigate(['home/despesas']);
  }

}
