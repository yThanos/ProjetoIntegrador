import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading: boolean = false;

  show() {
    this.isLoading=true;
  }

  hide() {
    this.isLoading=false;
  }
}
