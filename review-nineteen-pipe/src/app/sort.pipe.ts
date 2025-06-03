import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false // execute sort pipe at all time for any change, not a good practice 
})
export class SortPipe implements PipeTransform {

  public transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc'): (string | number)[] {
    const sorted: (string | number)[] = [...value];
    sorted.sort((a, b) => {
      if (direction === 'asc') {
        return a > b ? 1 : -1;
      }
      return a > b ? -1 : 1;
    });
    return sorted;
  }
}
