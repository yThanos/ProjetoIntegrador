import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from 'src/app/model/grupo';
import { Usuario } from 'src/app/model/usuario';
import { GrupoService } from 'src/app/service/grupo.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
  constructor(private rota: Router, private service: GrupoService) {
    setTimeout(() => {
      this.listar();
    }, 500)
  }
  tela: string = 'grupos';
  grupos: Grupo[] = [];
  grupo: Grupo = new Grupo();
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
    console.log(this.grupo);
  }
  reset(){
    let fechar = document.getElementById('fechaModal');
    fechar?.click();
    setTimeout(() => {
      this.grupo = new Grupo();
    },300)
  }
}
