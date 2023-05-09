import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AppService {

  private isLoading = new Subject<boolean>();
  public loading$ = this.isLoading.asObservable();

  hide(){
    this.isLoading.next(false);
  }
  show(){
    this.isLoading.next(true);
  }
}
