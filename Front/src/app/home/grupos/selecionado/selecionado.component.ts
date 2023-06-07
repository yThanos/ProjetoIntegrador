import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Despesa } from 'src/app/model/despesa';
import { Grupo } from 'src/app/model/grupo';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioGrupoDespesa } from 'src/app/model/usuarioGrupoDespesa';
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
  }
  dividir = true;
  usuarios: Usuario[] = [];
  despesas: Despesa[] = [];
  despesa: Despesa = new Despesa();
  opcao: string = "Cadastrar";

  inicio(){
    this.rota.navigate(['/home/grupos']);
  }
  listar(){
    this.service.getUsersGrupo(this.grupo.codigo).subscribe((resposta: Usuario[]) => {
      this.usuarios = resposta;
    })
    if(this.grupo.codigo != undefined)
    this.despesaService.getGroupDesp(this.grupo.codigo).subscribe((resposta: Despesa[]) => {
      this.despesas = resposta;
      console.log(this.despesas);
      setTimeout(() => {
        for(let desp of this.despesas){
          this.service.getPartes(this.grupo.codigo, desp.codigo).subscribe((resposta: UsuarioGrupoDespesa[]) => {
            console.log(resposta);
            desp.partes = resposta;
          })
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
  criar(){
    if(!this.dividir){
      this.addPartes();
    }
    if(this.validaValor()){
      this.despesa.dtCriacao = new Date().toISOString().split('T')[0];
      this.despesa.origem = "G"
      this.despesa.codigoOrigem = this.grupo.codigo;
      this.despesaService.cadastrar(this.despesa).subscribe((resposta: Despesa) => {
        this.despesa = new Despesa();
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
    if(this.despesa.partes != undefined && this.grupo.qtdUsuarios != undefined && this.despesa.valor != undefined){
      for(let u of this.usuarios){
        this.despesa.partes.push(new UsuarioGrupoDespesa(u.codigo, this.grupo.codigo, this.despesa.valor/this.grupo.qtdUsuarios));
      }
    }
  }
  addparte(){
    if(this.despesa.partes != undefined && this.grupo.qtdUsuarios != undefined){
      if(this.despesa.partes?.length < this.grupo.qtdUsuarios){
        this.despesa.partes.push(new UsuarioGrupoDespesa());
        console.log(this.despesa);
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
}
