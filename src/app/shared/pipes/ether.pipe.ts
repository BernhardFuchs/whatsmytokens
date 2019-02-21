import { Pipe, PipeTransform, Inject } from '@angular/core';
import { isEmpty as _isEmpty } from 'lodash';
import { WEB3 } from '../../core/';

@Pipe({
  name: 'ether'
})
export class EtherPipe implements PipeTransform {

  constructor(@Inject(WEB3) private web3) {}

  transform(value: any, args?: any): any {
    if (!_isEmpty(value)) {
      return this.web3.utils.fromWei(value, 'ether');
    }
  }

}
