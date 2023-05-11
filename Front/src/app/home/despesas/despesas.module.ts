import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasComponent } from './despesas.component';
import { FormsModule } from '@angular/forms';
import { StringFormatPipe } from 'src/app/service/stringFormat.pipe';



@NgModule({
  declarations: [
    DespesasComponent,
    StringFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DespesasModule { }
