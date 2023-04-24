import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent {
  constructor(private rota: Router) { }
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
}
