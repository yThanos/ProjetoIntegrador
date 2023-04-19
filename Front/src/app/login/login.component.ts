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
    this.campos();
  }

  campos(){

  }

  cpf = document.querySelector('cpf');
  usuario: Usuario = new Usuario();
  teste: boolean = true;

  troca(){
    this.teste = !this.teste;
  }
  async logar(){
    console.log('logando' + JSON.stringify(this.usuario));
    await this.service.login(this.usuario).subscribe((resposta) => {
      console.log("resp: "+JSON.stringify(resposta));
      const token = new JwtHelperService().decodeToken(resposta.token)
      localStorage.setItem('nome', token.nome);
      if(resposta.token != null)
      localStorage.setItem('token', JSON.stringify(resposta.token));
      console.log(JSON.stringify(resposta.token));
    })
    //this.rota.navigate(['/home']);
  }
  confirmarSenha = '';

  criarConta(){
    if(this.usuario.password != this.confirmarSenha && this.usuario.password != ''){
      alert('Senhas não conferem!');
    }else if(!this.usuario.cpf?.match(/^[\d]{3}\.[\d]{3}\.[\d]{3}-[\d]{2}$/)){
      console.log(this.usuario.cpf);
      alert('CPF inválido!');
    }else if(!this.usuario.username?.match(/^[\w\.]+@[\w]+\.[\w]{2,4}(\.[\w]{2})?$/)){
      alert('E-mail inválido!');
    }else{
      console.log('criando conta' + JSON.stringify(this.usuario));
      this.service.criarConta(this.usuario).subscribe(() => {
        this.teste = !this.teste;
        this.usuario = new Usuario();
      })
    }
  }
}
