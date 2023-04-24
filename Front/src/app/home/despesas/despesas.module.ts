import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasComponent } from './despesas.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    DespesasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class DespesasModule { }
