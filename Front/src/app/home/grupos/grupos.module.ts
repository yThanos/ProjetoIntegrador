import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GruposComponent } from './grupos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GruposComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GruposModule { }
