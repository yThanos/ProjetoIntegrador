import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposComponent } from './grupos.component';
import { FormsModule } from '@angular/forms';
import { SelecionadoComponent } from './selecionado/selecionado.component';
import { StringFormatPipe } from 'src/app/service/stringFormat.pipe';
import { StringFormatPipeModule } from 'src/app/service/stringFormatPipe.module';



@NgModule({
  declarations: [
    GruposComponent,
    SelecionadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StringFormatPipeModule
  ]
})
export class GruposModule { }
