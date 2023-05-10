import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasComponent } from './despesas.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DespesasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DespesasModule { }
