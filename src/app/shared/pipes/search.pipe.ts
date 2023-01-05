import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], searchText: string, key): any[] {
    if (!list) { return []; }
    if (!searchText) { return list; }

    searchText = searchText.toLowerCase();
    return list.filter( item => {
          return item[key].toLowerCase().includes(searchText);
        });
      }
}
