import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Grupo } from 'src/app/model/grupo';
import { Usuario } from 'src/app/model/usuario';
import { DespesaService } from 'src/app/service/despesa.service';
import { GrupoService } from 'src/app/service/grupo.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
  constructor(private rota: Router, private service: GrupoService, private despesaService: DespesaService, private usuarioService: UsuarioService) {
    setTimeout(() => {
      this.listar();
    }, 500)
  }
  selecionado?: Grupo = new Grupo();
  membros: Usuario[] = [];
  tela: string = 'grupos';
  grupos: Grupo[] = [];
  grupo: Grupo = new Grupo();
  despesas: Despesa[] = [];
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
  listar(){
    if(this.usuario.codigo != undefined)
    this.service.getGruposByUser(this.usuario.codigo).subscribe((resposta: Grupo[]) => {
      this.grupos = resposta;
      for(let grupo of this.grupos){
        this.service.getUsersGrupo(grupo.codigo).subscribe((resposta: Usuario[]) => {
          grupo.qtdUsuarios = resposta.length;
        })
      }
    })

  }
  criarGrupo(){
    if(this.usuario.codigo != undefined)
    this.service.addGrupo(this.grupo, this.usuario.codigo).subscribe((resposta: Grupo) => {
      this.listar();
      this.reset();
    })
  }
  reset(){
    let fechar = document.getElementById('fechaModal');
    fechar?.click();
    setTimeout(() => {
      this.grupo = new Grupo();
    },300)
  }
  selecionar(id?: number){
    if(id != undefined){
      this.service.getGrupoById(id).subscribe((resposta: Grupo) => {
        this.grupo = resposta;
        localStorage.setItem('grupo', JSON.stringify(this.grupo));
        this.rota.navigate(['/home/grupo/']);
      })
    }
  }
}
