import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'loader',
  template: '<ngx-loading [show]="loading"></ngx-loading>',
})
export class LoaderComponent {

  public loading: boolean = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) { }
}
