import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // this is bad, can lead to a preformance issue
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    return value.filter(item => item[propName] === filterString);
  }
}
