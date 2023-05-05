import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { InicioModule } from './inicio/inicio.module';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InicioModule
  ]
})
export class HomeModule { }
