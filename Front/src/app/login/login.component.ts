import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();

  teste: boolean = true;
  troca(){
    this.teste = !this.teste;
  }
  logar(){
    console.log('logando' + JSON.stringify(this.usuario));
  }

  criarConta(){
    console.log('criando conta' + JSON.stringify(this.usuario));
  }
}
