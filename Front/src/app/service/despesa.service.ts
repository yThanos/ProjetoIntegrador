import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Despesa } from '../model/despesa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8080';
  private readonly headers = { headers: { 'Content-Type': 'application/json' } };

  getUserDesp(id: number): Observable<Despesa[]>{//pega despesas do usuario por id
    return this.http.get<Despesa[]>(this.API + "/despesa/usuario/" + id, this.headers);
  }
  getGroupDesp(id: number): Observable<Despesa[]>{//pega despesas do grupo por id
    return this.http.get<Despesa[]>(this.API + "/despesa/grupo/" + id, this.headers);
  }
  cadastrar(despesa: Despesa): Observable<Despesa>{//cadastra despesa ja monta com o id do grupo ou usuario correspondente a onde ela é criada dentro do grupo ou fora
    return this.http.post<Despesa>(this.API + "/despesa", despesa, this.headers);
  }
  editar(despesa: Despesa, id: number): Observable<Despesa>{//sem segredo
    return this.http.put<Despesa>(this.API + "/despesa/" + id, despesa, this.headers);
  }
  deletar(id: number): Observable<Despesa>{//muda ativo pra false
    return this.http.delete<Despesa>(this.API + "/despesa/" + id, this.headers);
  }
  getById(id: number): Observable<Despesa>{//autoexplicativo muito usado
    return this.http.get<Despesa>(this.API + "/despesa/byId/" + id, this.headers);
  }
  getAll(): Observable<Despesa[]>{//talvez para admin, log ou estatistica
    return this.http.get<Despesa[]>(this.API + "/despesa/all", this.headers);
  }
  getDespesasByUserGrup(id: number): Observable<Despesa[]>{
    return this.http.get<Despesa[]>(this.API + "/despesa/byUserGrup/" + id, this.headers);
  }
  valorDespesasByUserGrup(id: number): Observable<number>{
    return this.http.get<number>(this.API + "/despesa/valorDespesasByUserGrup/" + id, this.headers);
  }
}
