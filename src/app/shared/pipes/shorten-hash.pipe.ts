import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash';
import { ShortenAddressService } from 'src/app/services';

@Pipe({
  name: 'shortenHash'
})
export class ShortenHashPipe implements PipeTransform {
  constructor(private shortenAddressService: ShortenAddressService) {}
  transform(value: string): string {
    if (isEmpty(value)) {
      return '';
    } else {
      return this.shortenAddressService.getShortAddress(value);
    }
  }
}
