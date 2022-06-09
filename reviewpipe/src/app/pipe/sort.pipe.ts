import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false, // to enable dynamic sorting, but this is bad, can lead to a preformance issue, 
               // but at the moment, it does not allow dynamic sorting
})
export class SortPipe implements PipeTransform {
  transform(value: any[], propName: string): any[] {
    value.sort((a, b) => {
      if (a[propName] < b[propName]) {
        return -1;
      } else {
        return 1;
      }
    });
    return value;
  }
}
