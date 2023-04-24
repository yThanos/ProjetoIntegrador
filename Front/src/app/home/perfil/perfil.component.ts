import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(private rota: Router) { }
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
}
