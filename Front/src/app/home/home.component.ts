import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  usuario: Usuario = JSON.parse(<string>localStorage.getItem('user'));
}
