import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private rota: Router){}

  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));

  logout() {
    localStorage.clear();
    this.rota.navigate(['/login']);
  }
}
