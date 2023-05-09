import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: LoginService, private rota: Router){
  }

  usuario: Usuario = new Usuario();
  teste: boolean = true;

  troca(){
    this.teste = !this.teste;
  }
  async logar(){
    await this.service.login(this.usuario).subscribe((resposta) => {
      const token = new JwtHelperService().decodeToken(resposta.token)
      localStorage.setItem('user', JSON.stringify(resposta));
      localStorage.setItem('token', resposta.token);
      this.rota.navigate(['home/inicio']);
    })

  }
  confirmarSenha = '';

  criarConta(){
    if(this.usuario.password != this.confirmarSenha && this.usuario.password != ''){
      alert('Senhas não conferem!');
    }else if(!this.usuario.cpf?.match(/^[\d]{3}\.[\d]{3}\.[\d]{3}-[\d]{2}$/)){
      alert('CPF inválido!');
    }else if(!this.usuario.username?.match(/^[\w\.]+@[\w]+\.[\w]{2,4}(\.[\w]{2})?$/)){
      alert('E-mail inválido!');
    }else{
      this.service.criarConta(this.usuario).subscribe(() => {
        this.usuario = new Usuario();
        this.teste = !this.teste;
      })
    }
  }
}
