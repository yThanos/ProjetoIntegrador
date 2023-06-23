import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasComponent } from './despesas.component';
import { FormsModule } from '@angular/forms';
import { StringFormatPipe } from 'src/app/service/stringFormat.pipe';
import { StringFormatPipeModule } from 'src/app/service/stringFormatPipe.module';



@NgModule({
  declarations: [
    DespesasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StringFormatPipeModule
  ]
})
export class DespesasModule { }
