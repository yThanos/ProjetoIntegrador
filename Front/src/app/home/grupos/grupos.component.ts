import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
  constructor(private rota: Router) { }
  inicio(){
    this.rota.navigate(['/home/inicio']);
  }
}
