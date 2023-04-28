import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CatgoriaService {

  constructor(private htpp: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  listar(id:number): Observable<Categoria[]>{
    return this.htpp.get<Categoria[]>(this.API + "/categoria/user/"+id, this.headers);
  }
  cadastrar(categoria: Categoria): Observable<Categoria>{
    return this.htpp.post<Categoria>(this.API + "/categoria", categoria, this.headers);
  }
  editar(categoria: Categoria, id: number): Observable<Categoria>{
    return this.htpp.put<Categoria>(this.API + "/categoria/"+id, categoria, this.headers);
  }
  deletar(id: number): Observable<any>{
    return this.htpp.delete<any>(this.API + "/categoria/"+id, this.headers);
  }
  getById(id: number): Observable<Categoria>{
    return this.htpp.get<Categoria>(this.API + "/categoria/"+id, this.headers);
  }
  getAll(): Observable<Categoria[]>{
    return this.htpp.get<Categoria[]>(this.API + "/categoria/all", this.headers);
  }
}
