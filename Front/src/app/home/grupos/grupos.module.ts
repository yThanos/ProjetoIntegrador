import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposComponent } from './grupos.component';
import { FormsModule } from '@angular/forms';
import { SelecionadoComponent } from './selecionado/selecionado.component';



@NgModule({
  declarations: [
    GruposComponent,
    SelecionadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GruposModule { }
