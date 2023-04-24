import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './security/auth.guard';
import { InicioComponent } from './home/inicio/inicio.component';
import { DespesasComponent } from './home/despesas/despesas.component';
import { GruposComponent } from './home/grupos/grupos.component';
import { PerfilComponent } from './home/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService],
    children: [
      {path: 'inicio', component: InicioComponent},
      {path: 'despesas', component: DespesasComponent},
      {path: 'grupos', component: GruposComponent},
      {path: 'perfil', component: PerfilComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
