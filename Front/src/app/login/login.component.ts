import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: LoginService, private rota: Router){
  }

  codigo = 0;
  confirmaEsqc = '';
  esqueci: Usuario = new Usuario();
  etapa = 1;
  usuario: Usuario = new Usuario();
  teste: boolean = true;

  troca(){
    this.teste = !this.teste;
  }
  async logar(){
    await this.service.login(this.usuario).subscribe((resposta) => {
      console.log(resposta.token)
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
  esqueciSenha(){
    if(this.esqueci.username)
    this.service.esqeuciSenha(this.esqueci.username).subscribe((resposta) => {
      this.etapa = 2;
      console.log(resposta);
    });
  }
  verificaCodigo(){
    if(this.esqueci.username && this.codigo){
      this.service.verificaCodigo(this.esqueci.username, this.codigo).subscribe((resposta) => {
        this.etapa = 3;
      })
    }
  }
  alteraSenha(){
    this.service.alteraSenha(this.esqueci, this.codigo).subscribe(() => {
      alert('Senha alterada com sucesso!');
      this.reset();
    })
  }
  reset(){
    let fechar = document.getElementById('fechaModal');
    this.esqueci = new Usuario();
    this.etapa = 1;
    this.confirmaEsqc = '';
    fechar?.click();
  }
}
