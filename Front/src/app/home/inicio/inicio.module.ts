import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { DespesasModule } from '../despesas/despesas.module';
import { GruposModule } from '../grupos/grupos.module';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    DespesasModule,
    GruposModule
  ]
})
export class InicioModule { }
