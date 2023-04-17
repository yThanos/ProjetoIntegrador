import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: LoginService){}

  usuario: Usuario = new Usuario();
  teste: boolean = true;

  troca(){
    this.teste = !this.teste;
  }
  logar(){
    console.log('logando' + JSON.stringify(this.usuario));
    this.service.login(this.usuario).subscribe((resposta) => {
      console.log(resposta);
      if(resposta){
      localStorage.setItem('token', JSON.stringify(resposta));
      }
    })
  }

  criarConta(){
    console.log('criando conta' + JSON.stringify(this.usuario));
  }
}
