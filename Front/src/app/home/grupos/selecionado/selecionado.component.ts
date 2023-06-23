import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Grupo } from 'src/app/model/grupo';
import { Partes } from 'src/app/model/partes';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioGrupoDespesa } from 'src/app/model/usuarioGrupoDespesa';
import { ViewDG } from 'src/app/model/viewDG';
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
    this.listar();
    setTimeout(() => {
      for(let u of this.usuarios){
        this.partes.push(new UsuarioGrupoDespesa(u.codigo, this.grupo.codigo, 0, u.nome));
      }
      console.log("AAAAAAAAAAAAAAA"+this.partes);
    }, 3000);
  }
  viewDespesa: ViewDG = new ViewDG();
  todos =  true;
  dividir = true;
  usuarios: Usuario[] = [];
  despesas: Despesa[] = [];
  despesa: Despesa = new Despesa();
  opcao: string = "Cadastrar";
  partes: UsuarioGrupoDespesa[] = [];
  idDespesa: number = 0;
  inicio(){
    this.rota.navigate(['/home/grupos']);
  }
  listar(){
    this.service.getUsersGrupo(this.grupo.codigo).subscribe((resposta: Usuario[]) => {
      this.usuarios = resposta;
      console.log("USUARIOS: "+this.usuarios);
    })
    if(this.grupo.codigo != undefined)
    this.despesaService.getGroupDesp(this.grupo.codigo).subscribe((resposta: Despesa[]) => {
      this.despesas = resposta;
      setTimeout(() => {
        for(let desp of this.despesas){
          this.service.getPartes(this.grupo.codigo, desp.codigo).subscribe((resposta: UsuarioGrupoDespesa[]) => {
            desp.partes = resposta;
          })
          this.service.despesaporuserdogrupo(this.grupo.codigo, this.usuario.codigo, desp.codigo).subscribe((resposta: any) => {
            desp.parte = resposta;
          })
        }
      }, 500);
    })
  }
  criar(){
    if(this.dividir){
      for(let p of this.partes){
        p.valor = this.despesa.valor!/this.grupo.qtdUsuarios!;
      }
      this.despesa.partes = this.partes;
    }
    if(this.validaValor()){
      this.despesa.dtCriacao = new Date().toISOString().split('T')[0];
      this.despesa.origem = "G"
      this.despesa.codigoOrigem = this.grupo.codigo;
      this.despesaService.cadastrar(this.despesa).subscribe((resposta: number) => {
        this.idDespesa = resposta;
        console.log("ID DESPESA: "+resposta);
        this.service.addPartes(new Partes(this.despesa.partes, this.idDespesa)).subscribe((resposta: any) => {

        })
        setTimeout(() => {
          this.despesa = new Despesa();
          this
        }, 500);
        this.listar();
      })
    }
  }

  resetCad(){
    let fechar = document.getElementById('fechaModalCad');
    fechar?.click();
    setTimeout(() => {
      this.despesa = new Despesa();
    }, 300)
  }
  addPartes(){
    this.despesa.partes = [];
    if(this.grupo.qtdUsuarios != undefined && this.despesa.valor != undefined){
      console.log("teste  ----")
      for(let u of this.usuarios){
        this.despesa.partes.push(new UsuarioGrupoDespesa(u.codigo, this.grupo.codigo, this.despesa.valor/this.grupo.qtdUsuarios, u.nome));
      }
    }
  }
  validaValor(): boolean{
    if(this.despesa.partes != undefined && this.despesa.valor != undefined){
      let valototal = 0;
      for(let p of this.despesa.partes){
        valototal += p.valor!;
      }
      if(valototal > this.despesa.valor){
        if(confirm("Valor das partes maior que o valor da despesa, valor da despesa será dividido igualmente entre as partes deseja continuar?")){
          for(let p of this.despesa.partes){
            p.valor = this.despesa.valor/this.despesa.partes.length;
          }
          return true;
        }
        return false;
      }
      if(valototal != this.despesa.valor){
        if(confirm("Valor das partes menor que o valor total das despesa, deseja continuar?")){
          return true;
        }
        return false;
      }
    }
    return true;
  }
  checa(){
    setTimeout(()=>{
      if(this.todos){
        console.log("todos");
        this.addPartes();
      }
      if(this.dividir){
        if(this.despesa.partes != undefined && this.despesa.valor != undefined){
          for(let p of this.despesa.partes){
            p.valor = this.despesa.valor/this.despesa.partes.length;
          }
        }
      }
    }, 500)
  }

  verDetalhes(id?: number){
    if(id != undefined)
    this.service.getview(id).subscribe((resposta: ViewDG) => {
      this.viewDespesa = resposta;
      const btn = document.getElementById('btnDetalhes');
      setTimeout(()=>{
        btn?.click();
      }, 500)
    })
  }
  fecharDetalhes(){
    const btn = document.getElementById('fechaModalDetalhes');
    this.viewDespesa = new ViewDG();
    btn?.click();
  }
}
