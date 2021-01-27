import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(product: any) {
    // if(!arr) return [];
    // return arr.reduce((acc, cur) => {
    //   return [...acc, cur, ...this.transform(cur[property], property)];
    // }, [])
    return product;
  }

}
