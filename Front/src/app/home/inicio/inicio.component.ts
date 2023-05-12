import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioGrupoDespesa } from 'src/app/model/usuarioGrupoDespesa';
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
      this.despesaService.getUsuarioGrupoDespesaByUser(this.usuario.codigo).subscribe((resposta:UsuarioGrupoDespesa[])=>{
        for(let ugd of resposta){
          if(ugd.valor != undefined)
          this.valorGrupo += ugd.valor;
          if(ugd.ativo == true)
          this.qtdGrupo++;
        }
      })
    }
  }
  grupos(){
    this.rota.navigate(['home/grupos']);
  }
  despesas(){
    this.rota.navigate(['home/despesas']);
  }

}
