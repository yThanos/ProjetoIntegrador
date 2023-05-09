import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  isLoading!: boolean;
  constructor(private service: AppService){
    this.service.loading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

}
