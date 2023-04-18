import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: LoginService, private http: HttpClient){}

  usuario: Usuario = new Usuario();
  teste: boolean = true;

  troca(){
    this.teste = !this.teste;
  }
  /*logar(){
    console.log('logando' + JSON.stringify(this.usuario));
    this.service.login(this.usuario).subscribe((resposta) => {
      console.log(resposta);
      if(resposta){
      localStorage.setItem('token', JSON.stringify(resposta));
      }
    })
  }*/

  logar(){
    this.http.post<String>("http://localhost:8080/login", JSON.stringify(this.usuario), {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe((dado: any)=>{
      console.log(dado);
    })
  }

  criarConta(){

    console.log('criando conta' + JSON.stringify(this.usuario));
  }
}
