import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesasComponent } from './despesas.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';



@NgModule({
  declarations: [
    DespesasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      animationType: 'circleSwish'
    })
  ]
})
export class DespesasModule { }
