import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'stringFormat'
})
export class StringFormatPipe implements PipeTransform {
  transform(value?: string,): string {

    if (value != undefined){
      return value.split('-')[2] + '/' + value.split('-')[1] + '/' + value.split('-')[0];
    } else{
      return '';
    }

  }
}
