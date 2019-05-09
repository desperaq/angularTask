import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return null; }
    if (!args) {
      return value;
    }
    args.toLowerCase();

    if (args.includes("stars")) {
      args = args.match(/\d+/)[0];
      return value.filter(function (item) {
        return JSON.stringify(item.rating).includes(args);
      })
    }

    if (args.includes("at least") && args.includes("stars")) {
      args = args.match(/\d+/)[0];
      return value.filter(function (item) {
        return JSON.stringify(item.rating >= args).includes(args);
      })
    }

    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
