import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private htpp: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  listar(id:number): Observable<Categoria[]>{//pega categorias do usuario e as gerais
    return this.htpp.get<Categoria[]>(this.API + "/categoria/user/"+id, this.headers);
  }
  listarGrupo(id:number): Observable<Categoria[]>{//pega categorias do grupo e as gerais
    return this.htpp.get<Categoria[]>(this.API + "/categoria/grupo/"+id, this.headers);
  }
  cadastrar(categoria: Categoria): Observable<Categoria>{//cadastra categoria
    return this.htpp.post<Categoria>(this.API + "/categoria", categoria, this.headers);
  }
  editar(categoria: Categoria, id: number): Observable<Categoria>{//edita categoria
    return this.htpp.put<Categoria>(this.API + "/categoria/"+id, categoria, this.headers);
  }
  deletar(id: number): Observable<any>{//ativo = false
    return this.htpp.delete<any>(this.API + "/categoria/"+id, this.headers);
  }
  getById(id: number): Observable<Categoria>{//autoexplicativo muito usado
    return this.htpp.get<Categoria>(this.API + "/categoria/"+id, this.headers);
  }
  getAll(): Observable<Categoria[]>{//talvez para admin, log ou estatistica
    return this.htpp.get<Categoria[]>(this.API + "/categoria/all", this.headers);
  }
}
