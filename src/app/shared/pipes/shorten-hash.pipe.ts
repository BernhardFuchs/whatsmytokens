import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenHash'
})
export class ShortenHashPipe implements PipeTransform {
  transform(value: string) {
    const startChars: string = value.slice(0, 7);
    const endChars: string = value.slice(value.length - 6, value.length - 1);
    return `${startChars}...${endChars}`;
  }

}
